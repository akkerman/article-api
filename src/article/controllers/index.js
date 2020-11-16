import { listArticles, addArticle } from '../use-cases/index.js'
import getArticlesController from './get-articles.js'
import postArticleController from './post-article.js'
import log from '../../logger.js'

export const getArticles = getArticlesController({ listArticles, log })
export const postArticle = postArticleController({ addArticle, log })
