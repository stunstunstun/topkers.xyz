const config = require('./index')

describe('Config', () => {
  test('Check environments', () => {
    expect(config.env).toBe('test')
  })
})
