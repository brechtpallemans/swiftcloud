import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Model } from './generic'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Album } from './album.entity'

@Entity()
export class Song extends Model {
  @Column({ type: 'text' })
  title: string

  @Column({ type: 'smallint' })
  releaseYear: number

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column({ nullable: true })
  albumId: string | null

  @ApiHideProperty()
  @Exclude()
  @ManyToOne(() => Album, { nullable: true })
  @JoinColumn()
  album?: Album | null
}
