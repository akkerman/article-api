export default function makeListArticles ({ articlesDb }) {
  return async function listArticles (query) {
    const articles = await articlesDb.find(query)

    return articles
  }
}
