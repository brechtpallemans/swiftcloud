import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Song } from 'models'
import { QueryService } from 'services'
import { getListResponseSchema } from 'services/types'
import { RequestQuery } from 'utils/query-parser/types'

@ApiTags('songs')
@Controller('songs')
export class SongController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  @ApiOperation({ description: 'Get a list of songs.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    schema: getListResponseSchema(Song),
  })
  async get(@Query() query: RequestQuery) {
    return this.queryService.readList(query, Song)
  }

  @Get(':id')
  @ApiOperation({ description: 'Get a song by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    type: Song,
  })
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: RequestQuery
  ) {
    return this.queryService.readById(id, query, Song)
  }
}
