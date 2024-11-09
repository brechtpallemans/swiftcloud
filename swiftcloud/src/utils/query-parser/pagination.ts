import { PageQuery, ParsedPagination } from './types'

export const parsePaginationQuery = (
  pagination?: Partial<PageQuery>
): ParsedPagination => {
  const take = parseInt(pagination?.limit ?? pagination?.pageSize ?? '25', 10)
  let skip = parseInt(pagination?.start ?? '0', 10)
  if (pagination?.page && !isNaN(parseInt(pagination?.page, 10)))
    skip = skip + (parseInt(pagination?.page) - 1) * take

  const pageResult = (count: number) => ({
    limit: take,
    page: Math.floor(skip / take) + 1,
    pageCount: Math.ceil(count / take),
    pageSize: take,
    start: skip,
    total: count,
  })
  return { take, skip, pageResult }
}
