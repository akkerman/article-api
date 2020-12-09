import sqlite3 from 'sqlite3'
const sq3 = sqlite3.verbose()

export default async function makeTestDb ({ dbName } = {}) {
  if (!dbName) {
    throw new Error('makeTestDb requires a (unique) dbName')
  }

  const db = new Promise((resolve, reject) => {
    const theDB = new sq3.Database(':memory:', err => {
      if (err) { return reject(err) }

      theDB.run(`CREATE TABLE articles (
        id text PRIMARY KEY,
        hash text UNIQUE,
        title text,
        description text,
        link text,
        tags text,
        image text,
        date real );`,
      err => err ? reject(err) : resolve(theDB))
    })
  })

  return {
    makeDb,
    close,
    clear
  }

  async function makeDb () {
    return db
  }

  async function clear (name) {
    return db.then(theDb => new Promise((resolve, reject) => {
      theDb.run('delete from ' + name, err => err ? reject(err) : resolve())
    }))
  }

  async function close () {
    return db.then(theDb => new Promise((resolve, reject) => {
      theDb.close(err => err ? reject(err) : resolve())
    }))
  }
}
