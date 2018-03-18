import Post, { reddit, devblog, gitHubRepo, githubTrending } from '../src'

describe('Posts', () => {
  // eslint-disable-next-line no-undef
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
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
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Devblog', async () => {
    expect.hasAssertions()
    const posts = await devblog(0, 10)
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Github Repos', async () => {
    expect.hasAssertions()
    const posts = await gitHubRepo('javascript')
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Github Trending', async () => {
    expect.hasAssertions()
    const posts = await githubTrending()
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })
})
