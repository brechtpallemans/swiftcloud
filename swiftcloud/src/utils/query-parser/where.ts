import { FindOptionsWhere } from 'typeorm'
import { deepAssign, parseJsonWithCatch } from '../generic'

export const parseWhereQuery = <T>(query): FindOptionsWhere<T> => {
  const where = {}
  for (const key of Object.keys(query)) {
    key.split(/[-.]/).reduce((acc, curr, i, arr) => {
      if (i === arr.length - 1) {
        deepAssign(acc, { [curr]: parseJsonWithCatch(query[key]) })
        return
      }
      if (typeof acc[curr] !== 'object') {
        acc[curr] = {}
        return acc[curr]
      }
      return acc[curr]
    }, where)
  }
  return where
}
