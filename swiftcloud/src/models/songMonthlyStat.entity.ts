import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Model } from './generic'
import { ApiProperty } from '@nestjs/swagger'
import { Song } from './song.entity'

@Entity()
export class SongMonthlyStat extends Model {
  @Column({ type: 'smallint' })
  @ApiProperty({ example: 2024 })
  year: number

  @Column({ type: 'smallint' })
  @ApiProperty({ example: 8 })
  month: number

  @Column({ type: 'bigint' })
  @ApiProperty({ example: 42069 })
  totalPlays: number

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column()
  songId: string

  @ManyToOne(() => Song, { nullable: false })
  @JoinColumn()
  song?: Song
}
