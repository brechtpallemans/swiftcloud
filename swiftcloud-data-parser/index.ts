import 'dotenv/config'
import { Client } from 'pg'
import { createReadStream } from 'fs'
import csvParser from 'csv-parser'
import {
  endOfMonth,
  getMonth,
  getYear,
  isBefore,
  parse,
  subYears,
} from 'date-fns'

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = parseInt(process.env.DB_PORT || '5432')
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
export const DB_DATABASE = process.env.DB_DATABASE || 'swiftcloud'
export const DB_SSL = process.env.DB_SSL === 'true'
export const DB_CONNECT_TIMEOUT = parseInt(
  process.env.DB_CONNECT_TIMEOUT || '6000'
)

const dbClient = new Client({
  user: DB_USERNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
  host: DB_HOST,
  ssl: DB_SSL,
  connectionTimeoutMillis: DB_CONNECT_TIMEOUT,
})

interface DataInput {
  Song: string
  Artist: string
  Writer: string
  Album: string
  Year: string
  'Plays - June': string
  'Plays - July': string
  'Plays - August': string
}

export enum SongArtistType {
  ARTIST = 'ARTIST',
  WRITER = 'WRITER',
  FEATURED = 'FEATURED',
}

/**
 * Helper to determine the stats date information
 * @param monthName String format of a month
 * @returns The last day of the month, in the year the month has last passed
 */
const getLastPassedMonthDate = (monthName) => {
  const now = new Date()
  const year = now.getFullYear()
  const currentYearMonth = parse(monthName, 'MMMM', new Date(year, 0, 1))
  const lastDateThisYear = endOfMonth(currentYearMonth)

  return isBefore(now, lastDateThisYear)
    ? endOfMonth(subYears(currentYearMonth, 1))
    : lastDateThisYear
}

const main = async () => {
  const rawData: DataInput[] = []
  await new Promise((res, rej) =>
    createReadStream('data.csv')
      .pipe(csvParser())
      .on('data', (data) => rawData.push(data))
      .on('error', rej)
      .on('end', res)
  )

  await dbClient.connect()
  for (const rawSongData of rawData) {
    const albumTitle = rawSongData.Album.replace(/\n/g, ' ')
    const songTitle = rawSongData.Song.replace(/\n/g, ' ')
    const releaseYear = parseInt(rawSongData.Year)

    const albumsResult = await dbClient.query(
      `select * from "albums" where "title" = $1 limit 1;`,
      [albumTitle]
    )
    let albumId: string | null = albumsResult.rows[0]?.id ?? null
    if (!albumId && !albumTitle.startsWith('None')) {
      const insertAlbumResult = await dbClient.query(
        'insert into "albums" ("title", "release_year") values ($1,$2) returning "id";',
        [albumTitle, releaseYear]
      )
      albumId = insertAlbumResult.rows[0].id as string
    }

    const songsResult = await dbClient.query(
      `select * from "songs" where "title" = $1 and "album_id" ${albumId ? '= $2' : 'is null'} limit 1;`,
      [songTitle, albumId].filter((v) => !!v)
    )

    let songId: string | undefined = songsResult.rows[0]?.id
    if (!songId) {
      const insertSongResult = await dbClient.query(
        'insert into "songs" ("title", "release_year", "album_id") values ($1,$2,$3) returning "id";',
        [songTitle, releaseYear, albumId]
      )
      songId = insertSongResult.rows[0].id as string
    }

    for (const playsKey of Object.keys(rawSongData).filter((key) =>
      key.startsWith('Plays')
    )) {
      const statsDate = getLastPassedMonthDate(playsKey.split(' - ')[1])
      const songMonthlyStatsResult = await dbClient.query(
        `select * from "song_monthly_stats" where "song_id" = $1 and "year" = $2 and "month" = $3 limit 1;`,
        [songId, getYear(statsDate), getMonth(statsDate) + 1]
      )
      if (songMonthlyStatsResult.rows[0]?.id) continue

      await dbClient.query(
        'insert into "song_monthly_stats" ("song_id", "year", "month", "total_plays") values ($1,$2,$3,$4) ;',
        [
          songId,
          getYear(statsDate),
          getMonth(statsDate) + 1,
          parseInt(rawSongData[playsKey]),
        ]
      )
    }

    const upsertArtist = async (name: string): Promise<string> => {
      const artistsResult = await dbClient.query(
        `select * from "artists" where "name" = $1 limit 1;`,
        [name]
      )
      const artistId: string | undefined = artistsResult.rows[0]?.id
      if (artistId) return artistId

      const insertArtistResult = await dbClient.query(
        'insert into "artists" ("name") values ($1) returning "id";',
        [name]
      )
      return insertArtistResult.rows[0].id
    }

    const upsertSongArtist = async (
      artistId: string,
      type: SongArtistType
    ): Promise<string> => {
      const songArtistsResult = await dbClient.query(
        `select * from "song_artists" where "song_id" = $1 and "artist_id" = $2 and "type" = $3 limit 1;`,
        [songId, artistId, type]
      )
      const songArtistId: string | undefined = songArtistsResult.rows[0]?.id
      if (songArtistId) return songArtistId

      const insertSongArtistResult = await dbClient.query(
        'insert into "song_artists" ("song_id", "artist_id", "type") values ($1,$2,$3) returning "id";',
        [songId, artistId, type]
      )
      return insertSongArtistResult.rows[0].id
    }

    for (const artist of rawSongData.Artist.split(/\nand |\n| and /)) {
      if (!artist.trim()) continue

      const artistId = await upsertArtist(
        artist.replace('featuring', '').trim()
      )
      await upsertSongArtist(
        artistId,
        artist.includes('featuring')
          ? SongArtistType.FEATURED
          : SongArtistType.ARTIST
      )
    }

    for (const writer of rawSongData.Writer.split('\n')) {
      if (!writer.trim()) continue

      const artistId = await upsertArtist(writer.trim())
      await upsertSongArtist(artistId, SongArtistType.WRITER)
    }
  }
  await dbClient.end()
}

main()
