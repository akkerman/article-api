export default function makeGetArticles ({ listArticles, log }) {
  if (typeof listArticles !== 'function') {
    throw new Error('makeGetArticles requires listArticles')
  }
  if (!log) {
    throw new Error('makeGetArticles requires log')
  }
  return async function getArticles ({ query }) {
    try {
      const data = await listArticles({ query })

      return {
        statusCode: 200,
        data
      }
    } catch (e) {
      log.error(e)
      return {
        statusCode: 400,
        data: {
          message: e.message
        }
      }
    }
  }
}
