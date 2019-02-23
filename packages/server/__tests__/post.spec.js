const request = require('supertest')
const { closeDatabase } = require('@hashtags/domain')
const { defaultSource } = require('src/graphql/post')
const server = require('./environments/server')

describe('Post', () => {
  afterAll(async () => {
    closeDatabase()
  })

  describe('Mutations', () => {
    test('createPost', async () => {
      const query = `
        mutation {
          createPost(input: {
            id: "sd098xx82",
            source: ${defaultSource},
            title: "This is text content",
            link: "http://localhost:10080/graphql"
          }) {
            id
            source
            title
            link
          }
        }
      `
      const { body } = await request(server)
        .post('/graphql')
        .send({ query })
        .expect('Content-Type', /json/)
        .expect(200)

      const { createPost } = body.data
      expect(createPost).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          source: expect.any(Number),
          title: expect.any(String),
          link: expect.any(String),
        }),
      )
    })
  })

  describe('Queries', () => {
    test('posts', async () => {
      const query = `
        query {
          posts(type:BLOG_PERSONAL) {
            id
            source
            title
            link
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
          source: expect.any(Number),
          title: expect.any(String),
          link: expect.any(String),
        }),
      )
    })
  })
})
