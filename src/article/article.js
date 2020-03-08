/* eslint no-magic-numbers: 0 */

export default function buildMakeArticle({ makeTags }) {
  return function makeArticle({
    title,
    description,
    tags,
    link,
    image,
    date,
  } = {}) {

    if (!title)
      throw new Error('Article must have a title')
    if (title.length < 3)
      throw new Error('Article title should be longer than 3 characters')
    if (!description)
      throw new Error('Article must have a description')
    if (!link)
      throw new Error('Article must have a link')
    if (!image)
      throw new Error('Article must have a image')
    if (!date)
      throw new Error('Article must have a date')

    const validTags = makeTags(tags)

    return Object.freeze({
      title,
      description,
      tags:validTags,
      link,
      image,
      date,
    })

  }
}
