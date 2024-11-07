import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV || 'production'
export const PORT = process.env.PORT || '4000'

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = parseInt(process.env.DB_PORT || '5432')
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
export const DB_DATABASE = process.env.DB_DATABASE || 'xpm-auth'
export const DB_SSL = process.env.DB_SSL === 'true'
export const DB_CONNECT_TIMEOUT = parseInt(
  process.env.DB_CONNECT_TIMEOUT || '6000'
)

export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? true
