import articlesDb from '../data-access/index.js'
import makeListArticles from './list-articles.js'
import makeAddArticle from './add-article.js'

export const listArticles = makeListArticles({ articlesDb })
export const addArticle = makeAddArticle({ articlesDb })
