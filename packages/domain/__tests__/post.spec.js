const { connectDatabase, closeDatabase, Post, SOURCE } = require('../src/index')

describe('Post', () => {
  beforeAll(async () => connectDatabase())
  afterAll(async () => closeDatabase())

  test('Posts', async () => {
    const [post] = await Post.find({ source: SOURCE['BLOG_PERSONAL'] })
    expect(post).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        link: expect.any(String),
      }),
    )
  })
})
