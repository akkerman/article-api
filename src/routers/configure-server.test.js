import configureServer from './configure-server'

describe('configure server', () => {
  // this looks like a pretty useless test
  // it, however, serves as a means to test all dependencies
  // if each module that wants dependencies properly throws an error
  // when the dependency is not provided this error
  // will show up here instead of during runtime

  it('exists', () => {
    const { server } = configureServer()

    expect(server).toBeDefined()
  })
})
