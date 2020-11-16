import makeArticlesDb from './articles-db.js'
import { makeDb } from '../../db.js'

import log from '../../logger.js'

export const articlesDb = makeArticlesDb({ makeDb, log })
export default articlesDb
