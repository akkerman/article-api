export default function makeArticlesDb ({ makeDb }) {
  return Object.freeze({
    insert,
    findByHash,
    find
  })

  async function insert (articleInfo) {
    const coll = await collection()

    const result = await coll.insertOne({ ...articleInfo, _id: articleInfo.id })
    const article = result.ops[0]

    delete article._id

    return article
  }

  async function findByHash ({ hash }) {
    const coll = await collection()

    return await coll.findOne({ hash }).project({ _id: 0 })
  }

  async function find () {
    const coll = await collection()

    return coll.find({}).project({ _id: 0 }).toArray()
  }

  async function collection () {
    const db = await makeDb()

    return db.collection('articles')
  }
}
