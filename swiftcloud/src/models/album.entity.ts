import { Column, Entity } from 'typeorm'
import { Model } from './generic'

@Entity()
export class Album extends Model {
  @Column({ type: 'text' })
  title: string

  @Column({ type: 'smallint' })
  releaseYear: number
}
