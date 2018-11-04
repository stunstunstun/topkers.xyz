const request = require('supertest')
const { closeDatabase } = require('@githubjobs/domain')
const server = require('./environments/server')

describe('Integration Testing with Users', () => {
  afterAll(async () => {
    closeDatabase()
  })

  test('Sign up with bad request', async () => {
    const query = `
      mutation {
        signup(type:FACEBOOK, data: "") {
          token
        }
      }
    `
    const { body } = await request(server)
      .post('/graphql')
      .send({ query })
      .expect('Content-Type', /json/)
      .expect(200)

    const { data } = body
    expect(data).toEqual(
      expect.objectContaining({
        signup: expect.any(Object),
      }),
    )
  })
})
