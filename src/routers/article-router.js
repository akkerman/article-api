import { makeRequestListener } from '../request/index.js'

import { getArticles, postArticle } from '../article/controllers/index.js'

export default articleRouter

const routes = {
  GET: makeRequestListener(getArticles),
  POST: makeRequestListener(postArticle)
}

async function articleRouter (req, res) {
  const listener = routes[req.method]

  if (listener) { return listener(req, res) }

  res.writeHead(405, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: `HTTP method ${req.method} is not supported by this URL` }))
}
