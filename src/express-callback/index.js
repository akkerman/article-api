import Status from 'http-status-codes'
module.exports = function makeExpressCallback (controller) {
  return (req, res) => {
    controller(httpRequest(req))
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.status(httpResponse.statusCode || Status.OK).send(httpResponse.body)
      })
      .catch(() => res.status(Status.INTERNAL_SERVER_ERROR).send({ error: 'An unkown error occurred.' }))
  }
}

function httpRequest ({ body, query, params, ip, method, ...req }) {
  return Object.freeze({
    body,
    query,
    params,
    ip,
    method,
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent')
    }
  })
}
