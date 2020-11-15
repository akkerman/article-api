import buildArticle from '../entities/index.js'

export default function makeAddArticle ({ articlesDb }) {
  return async function addArticle (articleInfo) {
    const article = buildArticle(articleInfo)
    const existing = await articlesDb.findByHash({ hash: article.hash })

    if (existing) { return existing }

    return articlesDb.insert({ ...article })
  }
}
