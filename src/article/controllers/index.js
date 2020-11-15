import { listArticles, addArticle } from '../use-cases/index.js'
import getArticlesController from './get-articles.js'
import postArticleController from './post-article.js'

export const getArticles = getArticlesController({ listArticles })
export const postArticle = postArticleController({ addArticle })
