export default function makeArticlesDb() {
  return Object.freeze({
    insert,
    findByHash,
    find,
  })

  const articles = {}

  async function insert(a) {
    articles[a.hash] = a

    return Promise.resolve(a)
  }

  async function findByHash({ hash }) {
    return Promise.resolve(articles[hash])
  }

  async function find() {
    const values = Object.values(articles)

    return Promise.resolve(values)
  }
}
