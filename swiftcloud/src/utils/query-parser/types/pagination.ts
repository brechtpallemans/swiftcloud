import { ApiProperty } from '@nestjs/swagger'

export interface PageQuery {
  page?: string
  pageSize?: string
  start?: string
  limit?: string
}

export class Pagination {
  @ApiProperty()
  limit?: number
  @ApiProperty()
  page?: number
  @ApiProperty()
  pageCount?: number
  @ApiProperty()
  pageSize?: number
  @ApiProperty()
  start?: number
  @ApiProperty()
  total?: number
}

export interface ParsedPagination {
  skip?: number
  take?: number
  pageResult: (count: number) => Pagination
}
