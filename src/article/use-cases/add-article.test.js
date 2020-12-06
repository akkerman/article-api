import makeAddArticle from './add-article.js'
import makeArticlesDb from '../data-access/articles-db.js'

import buildFakeArticle from '../../../__tests__/fixtures/article.js'
import makeTestDb from '../../../__tests__/fixtures/db.js'

const COLLECTION_NAME = 'articles'

describe('add article', () => {
  let testDb
  let articlesDb
  let addArticle

  beforeAll(async () => {
    testDb = await makeTestDb({ dbName: 'use-case-add-article' })
    articlesDb = makeArticlesDb({ makeDb: testDb.makeDb })
    addArticle = makeAddArticle({ articlesDb })
  })

  afterAll(async () => {
    await testDb.clear(COLLECTION_NAME)
  })

  test('make requires articlesDb', () => {
    const error = 'makeAddArticle requires articlesDb'
    expect(() => makeAddArticle()).toThrow(error)
    expect(() => makeAddArticle({})).toThrow(error)
  })
  it('inserts articles in the database', async () => {
    const newArticle = buildFakeArticle()
    const inserted = await addArticle(newArticle)

    expect(inserted).toMatchObject(newArticle)
  })

  it('is idempotent', async () => {
    const newArticle = buildFakeArticle({ id: undefined })

    const insertOne = await addArticle(newArticle)
    const insertTwo = await addArticle(newArticle)

    expect(insertOne.id).toBeDefined()
    expect(insertOne.id).toBe(insertTwo.id)
  })
})
