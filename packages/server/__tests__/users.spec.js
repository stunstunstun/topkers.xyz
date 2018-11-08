const request = require('supertest')
const { closeDatabase } = require('@githubjobs/domain')
const server = require('./environments/server')

describe('Integration Testing with Users', () => {
  afterAll(async () => {
    closeDatabase()
  })

  test('Sign up', async () => {
    const query = `
      mutation {
        signup(type:EMAIL, token: "wjdsupj@gmail.com") {
          token
        }
      }
    `
    const { body } = await request(server)
      .post('/graphql')
      .send({ query })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(body.data.signup).toBeTruthy()
  })
})
