export default function makePostArticle ({ addArticle, log }) {
  if (typeof addArticle !== 'function') {
    throw new Error('makePostArticle requires addArticle')
  }
  if (!log) {
    throw new Error('makePostArticle requires log')
  }
  return async function postArticle (httpRequest) {
    try {
      const articleInfo = httpRequest.body
      const posted = await addArticle(articleInfo)

      return {
        statusCode: 201,
        data: { posted }
      }
    } catch (e) {
      log.error(e, 'error when posting article')
      return {
        statusCode: 400,
        data: {
          message: e.message
        }
      }
    }
  }
}
