/* istanbul ignore file */
import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  config()
}

const DEFAULT_PORT = 3000
const DEFAULT_MONGO_URIS = 'mongodb://mongo:27017/articles'
const DEFAULT_LOG_LEVEL = 'warn'

export const port = process.env.port || DEFAULT_PORT
export const mongoUris = process.env.mongoUris || DEFAULT_MONGO_URIS
export const logLevel = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL

export default {
  port,
  mongoUris,
  logLevel
}
