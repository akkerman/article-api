/**
 * @typedef Request
 * @type {object}
 * @property {object} body
 * @property {object} query
 * @property {object} params
 * @property {string} path
 * @property {object} user
 */

/**
 * @typedef Response
 * @type {object}
 * @property {number} statusCode
 * @property {object} data
 */

/**
 * @param {function(Request):Promise<Response>} controller
 * @returns {import('express').RequestHandler}
 */
export default function makeRequestlistener ({ getRequestBody }) {
  if (typeof getRequestBody !== 'function') {
    throw new Error('makeRequestListener requires function getRequestBody')
  }
  return controller => {
    if (typeof controller !== 'function') {
      throw new Error('makeRequestListener requires function controller')
    }

    return async (req, res) => {
      let body = {}
      if (['PATCH', 'POST'].includes(req.method)) {
        body = await getRequestBody(req)
      }

      const httpRequest = Object.freeze({
        body
      })

      const { statusCode, data } = await controller(httpRequest)

      res.writeHead(statusCode, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
    }
  }
}
