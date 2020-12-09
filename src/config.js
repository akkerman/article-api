/* istanbul ignore file */
import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
  config()
}

const DEFAULT_PORT = 3000

const port = process.env.port || DEFAULT_PORT

export default {
  port
}
