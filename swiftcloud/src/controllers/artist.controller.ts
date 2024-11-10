import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Artist } from 'models'
import { QueryService } from 'services'
import { getListResponseSchema } from 'services/types'
import { RequestQuery, RequestRelationsQuery } from 'utils/query-parser/types'

@ApiTags('artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  @ApiOperation({ description: 'Get a list of artists.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    schema: getListResponseSchema(Artist),
  })
  async get(@Query() query: RequestQuery) {
    return this.queryService.readList(query, Artist)
  }

  @Get(':id')
  @ApiOperation({ description: 'Get an artist by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    type: Artist,
  })
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: RequestRelationsQuery
  ) {
    return this.queryService.readById(id, query, Artist)
  }
}
