const request = require('supertest')
const { closeDatabase } = require('@githubjobs/domain')
const server = require('./environments/server')

describe('User', () => {
  let token
  afterAll(async () => {
    closeDatabase()
  })

  describe('Mutations', () => {
    test('Signup', async () => {
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

      const { signup } = body.data
      expect(signup).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      )
      token = signup.token
    })
  })

  describe('Queries', () => {
    test('Me', async () => {
      const query = `
        query {
          me {
            id
            token
            userInfo
          }
        }
      `
      const { body } = await request(server)
        .post('/graphql')
        .send({ query })
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)

      const { me } = body.data
      expect(me).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          token: expect.any(String),
          userInfo: expect.any(Object),
        }),
      )
    })
  })
})
