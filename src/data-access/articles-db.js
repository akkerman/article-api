export default function makeArticlesDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findByHash,
    find
  })

  async function insert (articleInfo) {
    const db = await makeDb()

    const result = await db.collection('articles')
      .insertOne({ ...articleInfo, _id: articleInfo.id })
    const article = result.ops[0]

    delete article._id

    return article
  }

  async function findByHash ({ hash }) {
    const db = await makeDb()

    return await db.collection('articles').findOne({ hash }, { _id: 0 })
  }

  async function find () {
    const db = await makeDb()

    return await db.collection('articles').find({}, { _id: 0 }).toArray()
  }
}
