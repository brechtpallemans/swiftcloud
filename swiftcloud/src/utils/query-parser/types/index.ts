import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm'
import { PageQuery, ParsedPagination } from './pagination'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

export * from './pagination'

export class RequestRelationsQuery {
  @ApiPropertyOptional({
    description:
      'A list of relations that needs to be queried with the main entity.',
    example: 'songArtists.artist,songMonthlyStats',
    type: 'string',
  })
  include?: string | string[]
}

export class RequestQuery extends RequestRelationsQuery {
  @ApiPropertyOptional({
    description: 'The field(s) on which the results should be sorted',
    example: 'releaseYear.asc',
    type: 'string',
  })
  order?: string | string[]
  @ApiPropertyOptional({
    description: 'Object specifying pagination params',
    example: { page: '1', pageSize: '25' },
    type: 'object',
  })
  @ValidateNested({ each: true })
  @Type(() => PageQuery)
  pagination?: Partial<PageQuery>
  or?: unknown
}

export interface ParsedQuery<T> extends ParsedPagination {
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  order?: FindOptionsOrder<T>
  relations?: FindOptionsRelations<T>
}
