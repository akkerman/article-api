import articleRouter from './article-router.js'

describe('article router', () => {
  beforeEach(() => {
    jest.clearAllMocks().resetModules()
  })

  it('exists', () => {
    expect(typeof articleRouter).toEqual('function')
  })
  it('does 405', () => {
    const res = {
      writeHead: jest.fn(),
      end: jest.fn()
    }

    articleRouter({ method: 'TST' }, res)

    expect(res.writeHead).toBeCalledWith(405, { 'Content-Type': 'application/json' })
  })
})
