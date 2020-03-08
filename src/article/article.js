/* eslint no-magic-numbers: 0 */

export default function buildMakeArticle({ Id, md5, makeTags }) {
  return function makeArticle({
    id = Id.generate(),
    title,
    description,
    tags,
    link,
    image,
    date,
  } = {}) {

    if (!Id.isValid(id))
      throw new Error('Article must have a valid id')
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

    const hash = md5(title + description + link)

    return Object.freeze({
      id,
      hash,
      title,
      description,
      tags:validTags,
      link,
      image,
      date,
    })

  }
}
