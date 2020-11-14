const db = require('./db')

describe('db module', () => {
  it('has makeDb function', async () => {
    expect(typeof db.makeDb).toEqual('function')
    // db.makeDb()
  })
  it('has closeDb function', async () => {
    expect(typeof db.closeDb).toEqual('function')
    await db.closeDb()
  })
})
