import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Model } from './generic'
import { ApiProperty } from '@nestjs/swagger'
import { Album } from './album.entity'
import { SongArtist } from './songArtist.entity'
import { SongMonthlyStat } from './songMonthlyStat.entity'

@Entity()
export class Song extends Model {
  @Column({ type: 'text' })
  @ApiProperty({ example: 'Red' })
  title: string

  @Column({ type: 'smallint' })
  @ApiProperty({ example: 2012 })
  releaseYear: number

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column({ nullable: true })
  albumId: string | null

  @ManyToOne(() => Album, { nullable: true })
  @JoinColumn()
  album?: Album | null

  @OneToMany(() => SongMonthlyStat, (songMonthlyStat) => songMonthlyStat.song)
  songMonthlyStats?: SongMonthlyStat[]

  @OneToMany(() => SongArtist, (songArtist) => songArtist.song)
  songArtists?: SongArtist[]
}
