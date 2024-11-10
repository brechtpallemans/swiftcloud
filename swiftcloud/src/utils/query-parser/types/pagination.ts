import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'

export class PageQuery {
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  page?: string
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  pageSize?: string
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  start?: string
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @IsOptional()
  limit?: string
}

export class Pagination {
  @ApiProperty({ example: 25 })
  limit?: number
  @ApiProperty({ example: 1 })
  page?: number
  @ApiProperty({ example: 10 })
  pageCount?: number
  @ApiProperty({ example: 25 })
  pageSize?: number
  @ApiProperty({ example: 0 })
  start?: number
  @ApiProperty({ example: 240 })
  total?: number
}

export interface ParsedPagination {
  skip?: number
  take?: number
  pageResult: (count: number) => Pagination
}
