import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Album } from 'models'
import { QueryService } from 'services'
import { getListResponseSchema } from 'services/types'
import { Pagination, RequestQuery } from 'utils/query-parser/types'

@ApiTags('albums')
@Controller('albums')
@ApiExtraModels(Pagination)
export class AlbumController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  @ApiOperation({ description: 'Get a list of albums.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    schema: getListResponseSchema(Album),
  })
  async get(@Query() query: RequestQuery) {
    return this.queryService.readList(query, Album)
  }

  @Get(':id')
  @ApiOperation({ description: 'Get an album by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successful request',
    type: Album,
  })
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: RequestQuery
  ) {
    return this.queryService.readById(id, query, Album)
  }
}
