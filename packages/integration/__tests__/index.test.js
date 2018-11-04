const { Post } = require('../src/index')
const { reddit, devblogs, githubRepos, githubTrending } = require('../src/services')

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
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Devblog', async () => {
    expect.hasAssertions()
    const posts = await devblogs({ category: 'team', size: 20 })
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Github Repos', async () => {
    expect.hasAssertions()
    const posts = await githubRepos({ language: 'javascript' })
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })

  test('Get resources by Github Trending', async () => {
    expect.hasAssertions()
    const posts = await githubTrending({ since: 'weekly' })
    expect(Array.isArray(posts)).toBeTruthy()
    expect(posts[0] instanceof Post).toBeTruthy()
    expect(posts[0].id).toBeTruthy()
  })
})
