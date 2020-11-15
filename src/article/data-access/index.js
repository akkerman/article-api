import makeArticlesDb from './articles-db.js'
import { makeDb } from '../../db.js'

export const articlesDb = makeArticlesDb({ makeDb })
export default articlesDb
