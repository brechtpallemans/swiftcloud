import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Model } from './generic'
import { ApiProperty } from '@nestjs/swagger'
import { Song } from './song.entity'

@Entity()
export class SongMonthlyStat extends Model {
  @Column({ type: 'smallint' })
  year: number

  @Column({ type: 'smallint' })
  month: number

  @Column({ type: 'bigint' })
  totalPlays: number

  @Index()
  @ApiProperty({ format: 'uuid' })
  @Column()
  songId: string

  @ManyToOne(() => Song, { nullable: false })
  @JoinColumn()
  song?: Song
}
