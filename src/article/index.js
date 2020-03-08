import buildMakeArticle from './article'

const makeTags = s => s && s.split(', ')

const makeArticle = buildMakeArticle({ makeTags })

export default makeArticle

