

export default function makeArticlesDb() {
  const articles = {}

  return Object.freeze({
    insert: async a => {
      articles[a.hash] = a

      return Promise.resolve(a)
    },

    findByHash: async a => Promise.resolve(articles[a.hash])
  })
}

