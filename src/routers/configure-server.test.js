import configureServer from './configure-server'
import log from '../../__tests__/fixtures/logger.js'

describe('configure server', () => {
  // this looks like a pretty useless test
  // it, however, serves as a means to test all dependencies
  // if each module that wants dependencies properly throws an error
  // when the dependency is not provided this error
  // will show up here instead of during runtime

  it('exists', () => {
    const { server } = configureServer({ log })

    expect(server).toBeDefined()
  })
})
