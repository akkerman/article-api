import articlesDb from '../data-access/index.js'
import makeListArticles from './list-articles.js'
import makeAddArticle from './add-article.js'
import log from '../../logger.js'

export const listArticles = makeListArticles({ articlesDb, log })
export const addArticle = makeAddArticle({ articlesDb, log })
