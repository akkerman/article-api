export default function makeGetArticles ({ listArticles }) {
  if (typeof listArticles !== 'function') {
    throw new Error('makeGetArticles requires listArticles')
  }
  return async function postArticle ({ query }) {
    try {
      const data = await listArticles({ query })

      return {
        statusCode: 200,
        data
      }
    } catch (e) {
      return {
        statusCode: 400,
        data: {
          message: e.message
        }
      }
    }
  }
}
