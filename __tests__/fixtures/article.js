import faker from 'faker'
import cuid from 'cuid'
import crypto from 'crypto'

const Id = Object.freeze({
  generate: cuid,
  isValid: cuid.isCuid,
})

const md5 = text => crypto.createHash('md5').update(text, 'utf-8').digest('hex')

export default function makeFakeArticle(overrides) {
  const article = {
    id: Id.generate(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(2), // eslint-disable-line
    tags: faker.lorem.words().split(' '),
    link: faker.internet.url(),
    image: faker.image.technics(),
    date: Date.now(),
  }

  article.hash = md5(article.title + article.description + article.link)

  return {
    ...article,
    ...overrides,
  }
}
