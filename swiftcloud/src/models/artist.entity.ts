import { Column, Entity, OneToMany } from 'typeorm'
import { Model } from './generic'
import { SongArtist } from './songArtist.entity'

@Entity()
export class Artist extends Model {
  @Column({ type: 'text' })
  name: string

  @OneToMany(() => SongArtist, (songArtist) => songArtist.song)
  songArtists?: SongArtist[]
}
