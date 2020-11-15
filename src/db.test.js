import { makeDb, closeDb } from './db'

describe('db module', () => {
  it('has makeDb function', async () => {
    expect(typeof makeDb).toEqual('function')
    // db.makeDb()
  })
  it('has closeDb function', async () => {
    expect(typeof closeDb).toEqual('function')
    await closeDb()
  })
})
