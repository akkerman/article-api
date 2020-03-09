import makeListArticles from './list-articles'
import makeArticlesDb from '../data-access/articles-db'
import makeFakeArticle from '../../__tests__/fixtures/article.js'
// import makeDb from '../../__tests__/fixtures/db'

describe('get articles', () => {
  let articlesDb
  let listArticles

  beforeAll(() => {
    articlesDb = makeArticlesDb()
    listArticles = makeListArticles({ articlesDb })
  })

  it('gets all articles', async () => {
    const newArticles = Array.from({ length:10 }, makeFakeArticle)

    await Promise.all(newArticles.map(articlesDb.insert))

    const articles = await listArticles()

    expect(articles).toMatchObject(newArticles)
  })
})
