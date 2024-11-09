/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from '@nestjs/common'
import {
  ArrayOverlap,
  Between,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm'
import { isDate } from 'util/types'

function assertStringOrNumber(
  value: unknown
): asserts value is string | number {
  if (typeof value !== 'string' && typeof value !== 'number')
    throw new BadRequestException(
      `Condition misconfiguration: ${value} is not of type string or number`
    )
}

const parseArray = (value) => {
  if (Array.isArray(value)) return value
  else if (typeof value === 'string') return value.split(',')
  else return [value]
}

const getCondition = (key: string, value) => {
  switch (key) {
    case '$eq': {
      return value
    }
    case '$not': {
      return Not(value)
    }
    case '$like': {
      assertStringOrNumber(value)
      return ILike(`%${value}%`)
    }
    case '$gt':
    case '$moreThan': {
      assertStringOrNumber(value)
      return MoreThan(value)
    }
    case '$gte':
    case '$moreThanOrEqual': {
      assertStringOrNumber(value)
      return MoreThanOrEqual(value)
    }
    case '$lt':
    case '$lessThan': {
      assertStringOrNumber(value)
      return LessThan(value)
    }
    case '$lte':
    case '$lessThanOrEqual': {
      assertStringOrNumber(value)
      return LessThanOrEqual(value)
    }
    case '$null':
    case '$isNull': {
      return IsNull()
    }
    case '$overlaps': {
      const arr = parseArray(value)
      return ArrayOverlap(arr)
    }
    case '$in': {
      const arr = parseArray(value)
      if (arr.length === 1) return arr[0]
      return In(arr)
    }
    case '$between': {
      const arr = parseArray(value)
      if (arr.length < 2)
        throw new BadRequestException(
          `Condition misconfiguration: ${value} is not of type Array with length 2`
        )
      return Between(arr[0], arr[1])
    }
    default:
      return { [key]: value }
  }
}

/**
 * Transforms a query object to FindOptionsWhere, using a dictionary to inject
 * values from the server.
 *
 * Keys starting with "$" will be tried as a FindOperator.
 * Values starting with "$" will be looked up in the dictionary.
 *
 * @param query object that will be parsed to FindOptionsWhere
 * @param dictionary object containing data that can be referenced by path
 * @example
 * ```
 * > parseQueryTags({ firstName: '$user.firstName' }, { user: { firstName: 'James' } })
 * ```
 * ```terminal
 * { firstName: 'James' }
 * ```
 */
export const parseQueryTags = <T>(query): FindOptionsWhere<T> => {
  for (const key in query) {
    const value =
      typeof query[key] === 'object' && !isDate(query[key])
        ? parseQueryTags(query[key])
        : query[key]
    if (key.startsWith('$')) {
      return getCondition(key, value)
    }
    query[key] = value
  }
  return query
}
