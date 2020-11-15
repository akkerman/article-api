export default function makePostArticle ({ addArticle }) {
  return async function postArticle (httpRequest) {
    try {
      const articleInfo = httpRequest.body
      const posted = await addArticle(articleInfo)

      return {
        statusCode: 201,
        data: { posted }
      }
    } catch (e) {
      console.error(e)
      return {
        statusCode: 400,
        data: {
          message: e.message
        }
      }
    }
  }
}
