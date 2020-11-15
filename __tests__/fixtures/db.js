import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient

export default async function makeTestDb ({ dbName } = {}) {
  if (!dbName) {
    throw new Error('makeTestDb requires a (unique) dbName')
  }

  const connection = await MongoClient.connect(
    global.__MONGO_URI__,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  const db = await connection.db(dbName)

  return {
    makeDb,
    close,
    clear
  }

  async function makeDb () {
    return db
  }

  async function clear (name) {
    return db.collection(name).deleteMany({})
  }

  async function close () {
    await connection.close()
  }
}
