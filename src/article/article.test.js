import makeFakeArticle from '../../__tests__/fixtures/article'
import makeArticle from './'

describe('article', () => {
  it('must have a title', () => {
    const article = makeFakeArticle({ title: null })

    expect(() => makeArticle(article)).toThrow('Article must have a title')
  })
  it('must have a description', () => {
    const article = makeFakeArticle({ description: null })

    expect(() => makeArticle(article)).toThrow('Article must have a description')
  })
  it('must have a date', () => {
    const article = makeFakeArticle({ date: null })

    expect(() => makeArticle(article)).toThrow('Article must have a date')
  })
  it('must have a link', () => {
    const article = makeFakeArticle({ link: null })

    expect(() => makeArticle(article)).toThrow('Article must have a link')
  })
  it.todo('should have a valid url for a link')
  it('must have an image', () => {
    const article = makeFakeArticle({ image: null })

    expect(() => makeArticle(article)).toThrow('Article must have a image')
  })
  it.todo('should have a valid url for an image')
  it('can have tags', () => {
    const article = makeFakeArticle({ tags: 'node, blog, howto' })

    expect(makeArticle(article).tags).toEqual(['node', 'blog', 'howto'])
  })
})
