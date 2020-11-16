import { logLevel } from './config.js'
import bunyan from 'bunyan'
const log = bunyan.createLogger({ name: 'article-api', level: logLevel })

export default log
