import { ApiProperty } from '@nestjs/swagger'
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * Base model for timestamps metadata and uuid
 */
export abstract class Model {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn({ type: 'timestamptz', precision: 3 })
  createdAt: Date

  @ApiProperty({ format: 'date-time' })
  @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
  updatedAt: Date
}
