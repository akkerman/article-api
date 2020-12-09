export default function makeArticlesDb ({ makeDb } = {}) {
  if (typeof makeDb !== 'function') {
    throw new Error('makeArticlesDb requires function makeDb')
  }
  return Object.freeze({
    insert,
    findByHash,
    find
  })

  async function insert ({ id, hash, title, description, link, tags, image, date }) {
    const db = await makeDb()
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO articles (id, hash, title, description, link, tags, image , date) VALUES (?,?,?,?,?,?,?,?)',
        [id, hash, title, description, link, tags.join(','), image, date],
        err => err && reject(err)
      ).get('SELECT * from articles where id = ?', [id], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row2article(row))
        }
      })
    })
  }

  async function findByHash ({ hash }) {
    const db = await makeDb()
    return new Promise((resolve, reject) => {
      db.get('SELECT * from articles where hash = ?', [hash], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row2article(row))
        }
      })
    })
  }

  async function find () {
    const db = await makeDb()
    return new Promise((resolve, reject) => {
      db.all('SELECT * from articles', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows.map(row2article))
        }
      })
    })
  }

  function row2article (row) {
    if (row) {
      const article = { ...row }
      article.tags = row.tags ? row.tags.split(',') : []

      return article
    }

    return row
  }
}
