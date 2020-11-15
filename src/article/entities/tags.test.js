import makeTags from './tags'

describe('makeTags', () => {
  it('does not modify input when an array', () => {
    const expected = ['aap', 'noot', 'mies']
    const result = makeTags(expected)

    expect(result).toBe(expected)
  })
  it('splits the input into an arry when a string', () => {
    const expected = ['aap', 'noot', 'mies']
    const result = makeTags('aap, noot, mies')

    expect(result).toEqual(expected)
  })
  it('returns an empty array on other input', () => {
    expect(makeTags()).toEqual([])
    expect(makeTags({})).toEqual([])
    expect(makeTags(12)).toEqual([]) // eslint-disable-line
  })
})
