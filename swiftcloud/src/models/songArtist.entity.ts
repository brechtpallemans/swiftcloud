import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Model } from './generic'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
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

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Song, { nullable: false })
  @JoinColumn()
  song?: Song

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column()
  artistId: string

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Artist, { nullable: false })
  @JoinColumn()
  artist?: Artist
}
