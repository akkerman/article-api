import makeAddArticle from './add-article'
import makeFakeArticle from '../../__tests__/fixtures/article'
import makeArticlesDb from '../data-access/articles-db'

describe('add article', () => {
  let articlesDb

  beforeAll(() => {
    articlesDb = makeArticlesDb()
  })

  it('inserts articles in the database', async () => {
    const newArticle = makeFakeArticle()
    const addArticle = makeAddArticle({ articlesDb })

    const inserted = await addArticle(newArticle)

    expect(inserted).toMatchObject(newArticle)
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
