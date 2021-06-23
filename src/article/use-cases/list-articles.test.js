import makeListArticles from './list-articles'
import makeArticlesDb from '../data-access/articles-db'

import makeFakeArticle from '../../../__tests__/fixtures/article.js'
import makeTestDb from '../../../__tests__/fixtures/db.js'

const COLLECTION_NAME = 'articles'

describe('get articles', () => {
  let testDb
  let articlesDb
  let listArticles

  beforeAll(async () => {
    testDb = await makeTestDb({ dbName: 'use-case-list-articles' })
    articlesDb = makeArticlesDb({ makeDb: testDb.makeDb })
    listArticles = makeListArticles({ articlesDb })
  })
  beforeEach(async () => {
    await testDb.clear(COLLECTION_NAME)
  })

  afterAll(async () => {
    await testDb.close()
  })

  test('make requires articlesDb', () => {
    const error = 'makeListArticles requires articlesDb'
    expect(() => makeListArticles()).toThrow(error)
    expect(() => makeListArticles({})).toThrow(error)
  })

  it('gets all articles', async () => {
    const newArticles = Array.from({ length: 2 }, makeFakeArticle)

    newArticles[0].title = 'de eerste'
    newArticles[1].title = 'de tweede'
    await Promise.all(newArticles.map(articlesDb.insert))

    const articles = await listArticles()

    expect(articles).toMatchObject(newArticles)
  })
})
