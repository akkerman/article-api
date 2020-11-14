import makeGetArticles from './get-articles'
import buildFakeArticle from '../../__tests__/fixtures/article'
import faker from 'faker'

describe('get articles controller', () => {
  let crea
  let articles
  let getArticles

  beforeEach(() => {
    jest.clearAllMocks().resetModules()
    articles = [
      buildFakeArticle(),
      buildFakeArticle()
    ]
    crea = {
      listArticles: jest.fn().mockResolvedValue(articles)
    }
    getArticles = makeGetArticles(crea)
  })

  test('make requires input', () => {
    expect(() => makeGetArticles()).toThrow()
  })

  test.each([
    'listArticles'
  ])('make requires s', dep => {
    const err = `makeGetArticles requires ${dep}`

    expect(() => makeGetArticles({ ...crea, [dep]: undefined })).toThrow(err)
  })

  it('succesfully gets articles', async () => {
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      query: { text: 'stuff' }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: articles
    }
    const actual = await getArticles(request)

    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const error = Error(faker.lorem.sentence())
    crea.listArticles.mockRejectedValue(error)

    const request = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: error.message }
    }
    const actual = await getArticles(request)

    expect(actual).toEqual(expected)
  })
})
