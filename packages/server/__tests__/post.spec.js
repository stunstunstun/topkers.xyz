const request = require('supertest')
const { closeDatabase } = require('@githubjobs/domain')
const server = require('./environments/server')

describe('Post', () => {
  afterAll(async () => {
    closeDatabase()
  })

  describe('Queries', () => {
    test('Posts', async () => {
      const query = `
        query {
          posts {
            id
            source
            title
            desc
            link
            author
            avatar
            created
          }
        }
      `
      const { body } = await request(server)
        .post('/graphql')
        .send({ query })
        .expect('Content-Type', /json/)
        .expect(200)

      const [post] = body.data.posts
      expect(post).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          source: 3,
          title: expect.any(String),
          desc: expect.any(String),
          link: expect.any(String),
          author: expect.any(String),
          avatar: expect.any(String),
          created: expect.any(String),
        }),
      )
    })
  })
})
