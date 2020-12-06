
import getRequestBody from './get-request-body.js'

import makeReqListener from './request-listener.js'

export const makeRequestListener = makeReqListener({
  getRequestBody
})
