import makeReqListener from './request-listener.js'

describe('makeRequestListener', () => {
  let crea
  let makeRequestListener

  beforeEach(() => {
    jest.clearAllMocks().resetModules()
    const getRequestBody = jest.fn().mockResolvedValue({})
    crea = {
      getRequestBody
    }
    makeRequestListener = makeReqListener(crea)
  })

  test('make requires input', () => {
    expect(() => makeRequestListener()).toThrow()
  })

  test.each([
    'getRequestBody'
  ])('make requires s', dep => {
    const err = `makeRequestListener requires function ${dep}`

    expect(() => makeReqListener({ ...crea, [dep]: undefined })).toThrow(err)
  })

  it('requires a controller function', () => {
    expect(() => makeRequestListener()).toThrow(Error('makeRequestListener requires function controller'))
  })
  it('wraps a controller', () => {
    const controller = jest.fn()
    const fn = makeRequestListener(controller)

    expect(fn).toBeDefined()
    expect(controller).not.toHaveBeenCalled()
  })
  it('provides a wrapped controller with a httpRequest', async () => {
    crea.getRequestBody.mockResolvedValue({ test: '123' })
    const controller = jest.fn(() => ({}))
    const fn = makeRequestListener(controller)
    const res = {}

    res.writeHead = jest.fn(() => res)
    res.end = jest.fn(() => res)

    await fn({ method: 'GET' }, res)
    expect(controller).toHaveBeenCalledWith({ body: { } })
    expect(crea.getRequestBody).not.toHaveBeenCalled()
  })
  it('gets body from request', async () => {
    crea.getRequestBody.mockResolvedValue({ test: '123' })
    const controller = jest.fn(() => ({}))
    const fn = makeRequestListener(controller)
    const res = {}

    res.writeHead = jest.fn(() => res)
    res.end = jest.fn(() => res)

    await fn({ method: 'POST' }, res)
    expect(controller).toHaveBeenCalledWith({ body: { test: '123' } })
  })
})
