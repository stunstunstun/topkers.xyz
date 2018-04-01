import request from 'supertest'
import server from '../server'

describe('Monitoring', () => {
  afterAll(() => {
    server.close()
  })

  describe('GET /monitor/l7check', () => {
    test('L7 status is OK', () => {
      request(server)
        .get('/monitor/l7check')
        .expect(200)
    })
  })
})
