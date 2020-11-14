import http from 'http'

export default function configure (log) {
  const server = http.createServer((req, res) => {
    log.info('Received request', req.url)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'OK' }))
  })
  return { server }
}
