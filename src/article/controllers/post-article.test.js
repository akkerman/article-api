import makePostArticle from './post-article'
import makeFakeArticle from '../../../__tests__/fixtures/article'

describe('post article controller', () => {
  let crea
  let postArticle

  beforeEach(() => {
    crea = {
      addArticle: jest.fn().mockImplementation(a => a),
      log: {
        error: jest.fn()
      }
    }
    postArticle = makePostArticle(crea)
  })

  test('make requires input', () => {
    expect(() => makePostArticle()).toThrow()
  })

  test.each([
    'addArticle',
    'log'
  ])('make requires s', dep => {
    const err = `makePostArticle requires ${dep}`

    expect(() => makePostArticle({ ...crea, [dep]: undefined })).toThrow(err)
  })

  it('succesfully posts an article', async () => {
    const article = makeFakeArticle()
    const request = {
      body: article
    }
    const expected = {
      statusCode: 201,
      data: { posted: request.body }
    }
    const actual = await postArticle(request)

    expect(actual).toEqual(expected)
  })

  it('reports user errors', async () => {
    crea.addArticle.mockRejectedValue(Error('Pow!'))
    const fakeArticle = makeFakeArticle()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      data: fakeArticle
    }
    const expected = {
      statusCode: 400,
      data: { message: 'Pow!' }
    }
    const actual = await postArticle(request)

    expect(actual).toEqual(expected)
  })
})
