import reddit from '../src'

describe('Reddit', () => {
  test('Get resources about the Programming', async () => {
    expect.hasAssertions()
    const limit = 5
    const t = 'week'
    const options = {
      method: 'GET',
      body: {
        limit,
        t,
      },
    }
    const posts = await reddit(options)
    expect(posts.length).toBe(limit)
  })
})
