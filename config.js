/* istanbul ignore file */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const DEFAULT_PORT = 3000
const DEFAULT_MONGO_URIS = 'mongodb://mongo:27017/articles'

export default config()

function config () {
  const port = process.env.port || DEFAULT_PORT
  const mongoUris = process.env.mongoUris || DEFAULT_MONGO_URIS

  return Object.freeze({
    port, mongoUris
  })
}
