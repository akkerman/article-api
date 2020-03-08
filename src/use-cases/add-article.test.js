import makeAddArticle from './add-article'
import makeFakeArticle from '../../__tests__/fixtures/article'

describe('add article', () => {
  let articlesDb

  beforeAll(() => {
    const articles = {}

    articlesDb = {
      insert: jest.fn(async a => {
        articles[a.hash] = a

        return Promise.resolve(a)
      }),
      findByHash: jest.fn(async a => Promise.resolve(articles[a.hash])),
    }
  })

  it('inserts articles in the database', async () => {
    const newArticle = makeFakeArticle()
    const addArticle = makeAddArticle({ articlesDb })

    await addArticle(newArticle)

    expect(articlesDb.insert).toHaveBeenCalled()
  })

  it('is idempotent', async () => {
    const newArticle = makeFakeArticle({ id: undefined })
    const addArticle = makeAddArticle({ articlesDb })

    const insertOne = await addArticle(newArticle)
    const insertTwo = await addArticle(newArticle)

    expect(insertOne.id).toBeDefined()
    expect(insertOne.id).toBe(insertTwo.id)
  })


})
