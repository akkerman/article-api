import makeArticle from '../article'

export default function makeAddArticle ({ articlesDb }) {
  return async function addArticle (articleInfo) {
    const article = makeArticle(articleInfo)
    const existing = await articlesDb.findByHash({ hash: article.hash })

    if (existing) { return existing }

    return articlesDb.insert({ ...article })
  }
}
