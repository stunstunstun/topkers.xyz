import env from '../index'

test('Config', () => {
  expect(env).toBe('test')
})
