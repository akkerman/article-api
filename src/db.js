/* istanbul ignore file - database will be implicitly tested by e2e */

import config from './config.js'
import log from './logger.js'
import mongodb from 'mongodb'

const { mongoUris } = config
const { MongoClient } = mongodb

const client = new MongoClient(mongoUris, {
  useUnifiedTopology: true
})

export async function makeDb (databaseName = 'articles') {
  if (!client.isConnected()) {
    log.debug('connecting to %s', mongoUris)
    await client.connect()
  }

  return client.db(databaseName)
}

export async function closeDb () {
  if (client.isConnected()) { return client.close() }
}
