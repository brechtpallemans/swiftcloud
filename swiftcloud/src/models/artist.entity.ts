import { Column, Entity } from 'typeorm'
import { Model } from './generic'

@Entity()
export class Artist extends Model {
  @Column({ type: 'text' })
  name: string
}
