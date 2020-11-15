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
export default function makeRequestlistener (controller) {
  if (typeof controller !== 'function') {
    throw new Error('makeRequestlistener requires a controller function')
  }

  return async (req, res) => {
    let body = {}
    if (['PATCH', 'POST'].includes(req.method)) {
      body = await getBody(req)
    }

    const httpRequest = Object.freeze({
      body
      // query: req.query,
      // params: req.params
    })

    const { statusCode, data } = await controller(httpRequest)

    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
  }
}

function getBody (req) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''

      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        resolve(JSON.parse(body))
      })
    } catch (error) {
      reject(error)
    }
  })
}
