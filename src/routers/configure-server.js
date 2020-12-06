import http from 'http'

import articleRouter from './article-router.js'

export default function configure ({ log }) {
  if (!log) {
    throw Error('configure requires log')
  }
  const server = http.createServer((req, res) => {
    const { url } = req
    log.info('Received request', url)

    if (url.startsWith('/api/articles')) {
      return articleRouter(req, res)
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'NOT_FOUND' }))
  })
  return { server }
}
