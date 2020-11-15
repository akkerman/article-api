import articlesDb from '../data-access/index.js'
import makeListArticles from './list-articles.js'

export const listArticles = makeListArticles({ articlesDb })
