import Post, { reddit, devblog } from '../src'


describe('Posts', () => {
  test('Get resources by Reddit', async () => {
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
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Korean devblog', async () => {
    expect.hasAssertions()
    const options = {
      method: 'GET',
    }
    const posts = await devblog(options)
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })
})
