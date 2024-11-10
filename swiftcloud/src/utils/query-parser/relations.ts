import { FindOptionsRelations } from 'typeorm'

export const parseRelations = (
  include?: string | string[]
): FindOptionsRelations<unknown> => {
  if (!include) return {}
  const relationsArray = Array.isArray(include) ? include : include.split(',')
  const relationsObject = {}

  const addRelation = (keys: string[], obj: FindOptionsRelations<unknown>) => {
    const key = keys.shift()
    if (key) {
      if (!obj[key]) {
        obj[key] = keys.length > 0 ? {} : true
      }
      if (keys.length > 0) {
        addRelation(keys, obj[key])
      }
    }
  }

  relationsArray.forEach((relation) => {
    addRelation(relation.split('.'), relationsObject)
  })

  return relationsObject
}
