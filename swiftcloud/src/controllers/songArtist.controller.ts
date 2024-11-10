import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SongArtist } from 'models'
import { QueryService } from 'services'
import { getListResponseSchema } from 'services/types'
import { RequestQuery, RequestRelationsQuery } from 'utils/query-parser/types'

@ApiTags('song-artists')
@Controller('song-artists')
export class SongArtistController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  @ApiOperation({ description: 'Get a list of song artists.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    schema: getListResponseSchema(SongArtist),
  })
  async get(@Query() query: RequestQuery) {
    return this.queryService.readList(query, SongArtist)
  }

  @Get(':id')
  @ApiOperation({ description: 'Get an song artist by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    type: SongArtist,
  })
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: RequestRelationsQuery
  ) {
    return this.queryService.readById(id, query, SongArtist)
  }
}
