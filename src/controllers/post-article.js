export default function makePostArticle ({ addArticle }) {
  return async function postArticle (httpRequest) {
    try {
      const articleInfo = httpRequest.body
      const posted = await addArticle(articleInfo)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: { posted }
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
