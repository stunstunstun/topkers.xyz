import sum from '../index'

describe('Testing', () => {
  test('sum a and b', () => {
    expect.hasAssertions()
    expect(sum(1, 1)).toBe(2)
  })
})