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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Album } from 'models'
import { QueryService } from 'services'
import { getListResponseSchema } from 'services/types'
import {
  Pagination,
  RequestQuery,
  RequestRelationsQuery,
} from 'utils/query-parser/types'

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
  @ApiQuery({
    name: 'releaseYear',
    required: false,
    type: 'number',
    description: 'The year the album was released',
    example: 2012,
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: 'string',
    description: 'The album title',
    example: 'Red',
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
    @Query() query: RequestRelationsQuery
  ) {
    return this.queryService.readById(id, query, Album)
  }
}
