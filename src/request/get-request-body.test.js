import getRequestBody from './get-request-body.js'

describe('function getRequestBody', () => {
  let req

  beforeEach(() => {
    req = { on: jest.fn() }
  })

  it('resolves data', async () => {
    req.on.mockImplementationOnce((_, fn) => fn('{"data":"data"}'))
    req.on.mockImplementation((_, fn) => fn())
    const data = await getRequestBody(req)

    expect(data).toEqual({ data: 'data' })
  })

  it('rejects on wrong data', async () => {
    req.on.mockImplementationOnce((_, fn) => fn('{StuffHere: '))
    req.on.mockImplementation((_, fn) => fn())
    await expect(getRequestBody(req)).rejects.toThrow()
  })
})
