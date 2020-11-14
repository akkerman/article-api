/* istanbul ignore file - database will be implicitly tested by e2e */

import config from './config.js'
import mongodb from 'mongodb'

const { mongoUris } = config
const { MongoClient } = mongodb

const log = console

const client = new MongoClient(mongoUris, {
  useUnifiedTopology: true
})

async function makeDb (databaseName = 'rulemanager') {
  if (!client.isConnected()) {
    log.debug('connecting to %s', mongoUris)
    await client.connect()
  }

  return client.db(databaseName)
}

async function closeDb () {
  if (client.isConnected()) { return client.close() }
}

export default {
  makeDb,
  closeDb
}
