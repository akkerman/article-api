import makeListArticles from './list-articles'
import makeArticlesDb from '../data-access/articles-db'

import makeFakeArticle from '../../../__tests__/fixtures/article.js'
import makeDb, { clearDb } from '../../../__tests__/fixtures/db'

describe('get articles', () => {
  let articlesDb
  let listArticles

  beforeAll(() => {
    articlesDb = makeArticlesDb({ makeDb })
    listArticles = makeListArticles({ articlesDb })
  })
  afterEach(async () => {
    await clearDb()
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
