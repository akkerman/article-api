/* istanbul ignore file - server startup and shutdown will be implicitly tested by e2e */
import configureServer from './routers/configure-server.js'
import { closeDb } from './db.js'
import config from './config.js'

// -- base server setup
const log = console
const { server } = configureServer(log)

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

server.listen(config.port, () => {
  const { address, port } = server.address()

  log.info('API server listening at http://%s:%s', address, port)
})

function shutdown () {
  log.info('shutting down')
  server.close(function onServerClosed (closeErr) {
    log.info('server closed')
    if (closeErr) {
      log.error(closeErr)
      process.exitCode = 1
    }
    log.info('close database')
    closeDb().catch(e => { log.error('Error while closing database'); log.error(e) })
    log.info('exit')
    process.exit()
  })
}
