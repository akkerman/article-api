import makeRequestListener from './request-listener.js'

import { getArticles, postArticle } from '../article/controllers/index.js'

const getArticlesListener = makeRequestListener(getArticles)
const postArticleListener = makeRequestListener(postArticle)

export default articleRouter

async function articleRouter (req, res) {
  if (req.method === 'GET') {
    return getArticlesListener(req, res)
  }

  if (req.method === 'POST') {
    return postArticleListener(req, res)
  }

  res.writeHead(405, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: `HTTP method ${req.method} is not supported by this URL` }))
}
