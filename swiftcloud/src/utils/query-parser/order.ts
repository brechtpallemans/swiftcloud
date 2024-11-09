import { FindOptionsOrder } from 'typeorm'
import { deepAssign } from '../generic'

const parseOrderString = (q: string) => {
  const split = q.split(/[-.]/)
  if (
    !/(ASC)|(DESC)|(FIRST)|(LAST)/.test(split[split.length - 1].toUpperCase())
  )
    split.push('ASC')
  return split.reduceRight((acc, curr) => {
    return { [curr]: acc } as any // eslint-disable-line @typescript-eslint/no-explicit-any
  })
}

export const parseOrderQuery = <T>(
  query: string | string[] | undefined,
  defaultOrder?: FindOptionsOrder<T>
): FindOptionsOrder<T> | undefined => {
  if (!query) return defaultOrder
  const queries = Array.isArray(query) ? query : query.split(',')
  return queries.reduce(
    (acc, curr) => deepAssign(acc, parseOrderString(curr)),
    {}
  )
}
