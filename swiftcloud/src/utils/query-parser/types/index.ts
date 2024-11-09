import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm'
import { PageQuery, ParsedPagination } from './pagination'

export * from './pagination'

export interface RequestQuery {
  order?: string | string[]
  pagination?: Partial<PageQuery>
  or?: unknown
  include?: string
}

export interface ParsedQuery<T> extends ParsedPagination {
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  order?: FindOptionsOrder<T>
  relations?: FindOptionsRelations<T>
}
