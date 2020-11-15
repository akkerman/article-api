import buildMakeArticle from './article.js'
import makeTags from './tags.js'
import Id from '../../Id.js'
import crypto from 'crypto'

const md5 = text => crypto.createHash('md5').update(text, 'utf-8').digest('hex')

const makeArticle = buildMakeArticle({ Id, md5, makeTags })

export default makeArticle
