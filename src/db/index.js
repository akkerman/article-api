/* istanbul ignore file */
/* eslint no-console: 0 */
import { makeDb } from '../db.js'
import dotenv from 'dotenv'
import log from '../logger.js'

dotenv.config()

async function setupDb () {
  log.info('Setting up database...')
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await makeDb()
  const result = await db
    .collection('articles')
    .createIndexes([
      { key: { hash: 1 }, name: 'hash_idx' },
      { key: { tags: -1 }, name: 'tag_idx' }
    ])

  log.info(result)
  log.info('Database setup complete...')
  process.exit()
}

setupDb()
