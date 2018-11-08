const { SOURCE } = require('@githubjobs/domain')
const { Post } = require('../src/index')
const { reddit, devblogs, githubRepos, githubTrending } = require('../src/services')

const size = 20

describe('Posts', () => {
  test('Get resources by Reddit', async () => {
    expect.hasAssertions()
    const posts = await reddit({ since: 'week', size })
    const [post] = posts
    expect(posts.length).toBe(size)
    expect(post instanceof Post).toBeTruthy()
    expect(post.id).toBeTruthy()
  })

  test('Get resources by Devblog', async () => {
    expect.hasAssertions()
    const posts = await devblogs({ source: SOURCE.DEVBLOGS_TEAM, size })
    const [post] = posts
    expect(posts.length).toBe(size)
    expect(post instanceof Post).toBeTruthy()
    expect(post.id).toBeTruthy()
  })

  test('Get resources by Github Repos', async () => {
    expect.hasAssertions()
    const posts = await githubRepos({ language: 'javascript' })
    const [post] = posts
    expect(posts.length).toBe(30)
    expect(post instanceof Post).toBeTruthy()
    expect(post.id).toBeTruthy()
  })

  test('Get resources by Github Trending', async () => {
    expect.hasAssertions()
    const posts = await githubTrending({ since: 'weekly' })
    const [post] = posts
    expect(posts.length).toBe(25)
    expect(post instanceof Post).toBeTruthy()
    expect(post.id).toBeTruthy()
  })
})
