import buildMakeArticle from './article'
import Id from '../Id'
import crypto from 'crypto'

const md5 = text => crypto.createHash('md5').update(text, 'utf-8').digest('hex')

const makeTags = s => s && s.split(', ')

const makeArticle = buildMakeArticle({ Id, md5, makeTags })

export default makeArticle

