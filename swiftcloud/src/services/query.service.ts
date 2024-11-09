import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { Model } from 'models/generic'
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm'
import { parseQuery } from 'utils/query-parser'
import { RequestQuery } from 'utils/query-parser/types'

@Injectable()
export class QueryService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async readList<T extends ObjectLiteral>(
    query: RequestQuery,
    target: EntityTarget<T>
  ) {
    const repository = this.dataSource.getRepository(target)
    const { skip, take, pageResult, where, order, relations } =
      parseQuery(query)

    const countPromise = repository.count({
      where,
      order,
    })

    const findPromise = repository.find({
      where,
      order,
      relations,
      skip,
      take,
    })

    const [count, data] = await Promise.all([countPromise, findPromise])

    return { data, meta: { pagination: pageResult(count) } }
  }

  async readById<T extends ObjectLiteral & Model>(
    id: string,
    query: RequestQuery,
    target: EntityTarget<T>
  ) {
    const repository = this.dataSource.getRepository<Model>(target)
    const { relations } = parseQuery(query)

    return repository.findOneOrFail({ where: { id }, relations })
  }
}
