/* istanbul ignore file - database will be implicitly tested by e2e */

import log from './logger.js'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database(':memory:', err => {
  if (err) { return log.error(err) }

  db.run(`CREATE TABLE articles (
    id text PRIMARY KEY,
    hash text UNIQUE,
    title text,
    description text,
    link text,
    tags text,
    image text,
    date real );
  `, err => {
    if (err) { log.error(err, 'table already created?') }
  })
})

export async function makeDb () {
  return db
}

export async function closeDb () {
  return new Promise((resolve, reject) => {
    db.close(err => {
      if (err) {
        log.error(err)
        reject(err)
      } else { resolve() }
    })
  })
}
