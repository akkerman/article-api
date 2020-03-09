import makePostArticle from './post-article'
import makeFakeArticle from '../../__tests__/fixtures/article'

describe('post article controller', () => {
  it('succesfully posts an article', async () => {
    const postArticle = makePostArticle({ addArticle: a => a })
    const article = makeFakeArticle()
    const request = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: article,
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        // 'Last-Modified': new Date(request.body.modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: { posted: request.body }
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
        'Content-Type': 'application/json',
      },
      body: fakeArticle
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await postArticle(request)

    expect(actual).toEqual(expected)
  })
})
