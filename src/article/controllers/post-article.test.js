import makePostArticle from './post-article'
import makeFakeArticle from '../../__tests__/fixtures/article'

describe('post article controller', () => {
  it('succesfully posts an article', async () => {
    const postArticle = makePostArticle({ addArticle: a => a })
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
    const postArticle = makePostArticle({
      addArticle: () => {
        throw Error('Pow!')
      }
    })
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
