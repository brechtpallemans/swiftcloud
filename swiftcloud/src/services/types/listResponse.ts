/* eslint-disable @typescript-eslint/ban-types */
import { getSchemaPath } from '@nestjs/swagger'
import { ObjectLiteral } from 'typeorm'
import { Pagination } from 'utils/query-parser/types'

export interface ListResponse<Entity extends ObjectLiteral> {
  data: Entity[]
  meta: {
    pagination: Pagination
  }
}

export const getListResponseSchema = (model: string | Function) => ({
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: { $ref: getSchemaPath(model) },
    },
    meta: {
      type: 'object',
      properties: {
        pagination: {
          $ref: getSchemaPath(Pagination),
        },
      },
    },
  },
})
