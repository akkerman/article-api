import makeFakeArticle from '../../../__tests__/fixtures/article'
import makeArticle from './'

describe('article', () => {
  it('should handle undefind', () => {
    expect(() => makeArticle()).toThrow('Article must have a title')
  })
  it('must have a title', () => {
    const article = makeFakeArticle({ title: null })

    expect(() => makeArticle(article)).toThrow('Article must have a title')
  })
  it('must have some text in the title', () => {
    const article = makeFakeArticle({ title: 'aa' })

    expect(() => makeArticle(article)).toThrow('Article title should be a minimal of 3 characters')
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
  it('can have an id', () => {
    const article = makeFakeArticle({ id: 'invalid' })
    const noId = makeFakeArticle({ id: undefined })

    expect(() => makeArticle(article)).toThrow('Article must have a valid id')
    expect(() => makeArticle(noId)).not.toThrow()
  })
  it('can create an id ', () => {
    const noId = makeFakeArticle({ id: undefined })
    const article = makeArticle(noId)

    expect(article.id).toBeDefined()
  })
  it('can have tags', () => {
    const article = makeFakeArticle({ tags: 'node, blog, howto' })

    expect(makeArticle(article).tags).toEqual(['node', 'blog', 'howto'])
  })
})
