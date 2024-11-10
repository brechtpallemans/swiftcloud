import { Column, Entity, OneToMany } from 'typeorm'
import { Model } from './generic'
import { SongArtist } from './songArtist.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Artist extends Model {
  @Column({ type: 'text' })
  @ApiProperty({ example: 'Taylor Swift' })
  name: string

  @OneToMany(() => SongArtist, (songArtist) => songArtist.song)
  songArtists?: SongArtist[]
}
