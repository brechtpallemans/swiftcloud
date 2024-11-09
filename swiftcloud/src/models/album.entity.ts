import { Column, Entity, OneToMany } from 'typeorm'
import { Model } from './generic'
import { Song } from './song.entity'

@Entity()
export class Album extends Model {
  @Column({ type: 'text' })
  title: string

  @Column({ type: 'smallint' })
  releaseYear: number

  @OneToMany(() => Song, (song) => song.album)
  songs?: Song[]
}
