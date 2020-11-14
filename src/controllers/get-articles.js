export default function makeGetArticles ({ listArticles }) {
  if (typeof listArticles !== 'function') {
    throw new Error('makeGetArticles requires listArticles')
  }
  return async function postArticle ({ query }) {
    try {
      const data = await listArticles({ query })

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: data
      }
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
