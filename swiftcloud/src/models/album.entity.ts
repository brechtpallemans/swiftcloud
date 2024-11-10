import { Column, Entity, OneToMany } from 'typeorm'
import { Model } from './generic'
import { Song } from './song.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Album extends Model {
  @Column({ type: 'text' })
  @ApiProperty({ example: 'Red' })
  title: string

  @Column({ type: 'smallint' })
  @ApiProperty({ example: 2012 })
  releaseYear: number

  @OneToMany(() => Song, (song) => song.album)
  songs?: Song[]
}
