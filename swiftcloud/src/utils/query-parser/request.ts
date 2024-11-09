import { ParsedQuery, RequestQuery } from './types'
import { parseOrderQuery } from './order'
import { parsePaginationQuery } from './pagination'
import { parseWhereQuery } from './where'
import { parseRelations } from './relations'

export const parseQuery = <T>(requestQuery: RequestQuery): ParsedQuery<T> => {
  const { order: orderQuery, pagination, or, include, ...query } = requestQuery

  const { skip, take, pageResult } = parsePaginationQuery(pagination)
  const order = parseOrderQuery<T>(orderQuery)
  let where = parseWhereQuery(query)

  if (or && Array.isArray(or)) {
    where = or.map((f) =>
      parseWhereQuery({
        ...f,
        ...where,
      })
    )
  }

  const relations = parseRelations(include)

  return { skip, take, where, order, pageResult, relations }
}
