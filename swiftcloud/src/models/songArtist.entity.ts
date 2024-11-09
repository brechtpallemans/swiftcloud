import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Model } from './generic'
import { ApiProperty } from '@nestjs/swagger'
import { Song } from './song.entity'
import { Artist } from './artist.entity'
import { SongArtistType } from './types'

@Entity()
export class SongArtist extends Model {
  @Column({ type: 'enum', enum: SongArtistType, enumName: 'song_artist_type' })
  type: SongArtistType

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column()
  songId: string

  @ManyToOne(() => Song, { nullable: false })
  @JoinColumn()
  song?: Song

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column()
  artistId: string

  @ManyToOne(() => Artist, { nullable: false })
  @JoinColumn()
  artist?: Artist
}
