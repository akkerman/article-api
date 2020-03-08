import cuid from 'cuid'

const Id = Object.freeze({
  generate: cuid,
  isValid: cuid.isCuid,
})

export default Id
