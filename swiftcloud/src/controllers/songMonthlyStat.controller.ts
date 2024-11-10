import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SongMonthlyStat } from 'models'
import { QueryService } from 'services'
import { getListResponseSchema } from 'services/types'
import { RequestQuery, RequestRelationsQuery } from 'utils/query-parser/types'

@ApiTags('song-monthly-stats')
@Controller('song-monthly-stats')
export class SongMonthlyStatController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  @ApiOperation({ description: 'Get a list of song monthly stats.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    schema: getListResponseSchema(SongMonthlyStat),
  })
  async get(@Query() query: RequestQuery) {
    return this.queryService.readList(query, SongMonthlyStat)
  }

  @Get(':id')
  @ApiOperation({ description: 'Get an song monthly stat by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    type: SongMonthlyStat,
  })
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: RequestRelationsQuery
  ) {
    return this.queryService.readById(id, query, SongMonthlyStat)
  }
}
