import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  DB_SSL,
  DB_CONNECT_TIMEOUT,
} from 'config'

const entities = ['build/src/models/*.js']
const migrations = ['build/src/migrations/*.js']

class PluralTableNameSnakeNamingStrategy extends SnakeNamingStrategy {
  tableName(className: string, customName: string): string {
    return customName
      ? customName
      : super.tableName(className, customName) + 's'
  }
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: DB_SSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
  entities,
  migrations,
  migrationsRun: true,
  logging: ['error', 'warn', 'migration', 'schema'],
  namingStrategy: new PluralTableNameSnakeNamingStrategy(),
  connectTimeoutMS: DB_CONNECT_TIMEOUT,
}

export const dataSource = new DataSource(dataSourceOptions)
