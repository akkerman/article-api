export default function makeListArticles ({ articlesDb } = {}) {
  if (!articlesDb) {
    throw new Error('makeListArticles requires articlesDb')
  }
  return async function listArticles ({ query } = {}) {
    const articles = await articlesDb.find(query)

    return articles
  }
}
