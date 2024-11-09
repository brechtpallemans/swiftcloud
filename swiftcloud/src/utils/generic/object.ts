import { isDate } from 'util/types'

export const isObject = (target: unknown) =>
  target &&
  typeof target === 'object' &&
  !Array.isArray(target) &&
  !isDate(target)

/**
 * Similar to Object.assign, but retains target values on nested objects.
 * Incoming source type always takes precedence.
 *
 * Example:
 * ```
 * deepAssign({ myObj: { key: 'value'}}, { myObj: 'value' }) // returns { myObj: 'value' }
 * ```
 */
export const deepAssign = <T extends object>(
  target: T,
  ...sources: any[]
): T => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key]) && source[key].constructor.name === 'Object') {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepAssign(target[key], source[key])
      } else Object.assign(target, { [key]: source[key] })
    }
  }

  return deepAssign(target, ...sources)
}
