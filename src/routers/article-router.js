import makeRequestListener from './request-listener.js'

import { getArticles } from '../article/controllers/index.js'

const getArticlesListener = makeRequestListener(getArticles)

export default articleRouter

async function articleRouter (req, res) {
  if (req.method === 'GET') {
    return getArticlesListener(req, res)
  }
  res.writeHead(405, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: `HTTP method ${req.method} is not supported by this URL` }))
}
