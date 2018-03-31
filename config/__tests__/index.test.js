const config = require('../index')

describe('Config', () => {
  test('Check environments', () => {
    expect(config.default.env).toBe('test')
  })
})
