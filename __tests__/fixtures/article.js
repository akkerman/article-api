import faker from 'faker'

export default function makeFakeArticle(overrides) {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(2), // eslint-disable-line
    tags: faker.lorem.words().split(' '),
    link: faker.internet.url(),
    image: faker.image.technics(),
    date: Date.now(),
  }

  return {
    ...article,
    ...overrides,
  }
}
