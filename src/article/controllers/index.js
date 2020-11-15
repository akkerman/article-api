import { listArticles } from '../use-cases/index.js'
import getArticlesController from './get-articles.js'

export const getArticles = getArticlesController({ listArticles })
