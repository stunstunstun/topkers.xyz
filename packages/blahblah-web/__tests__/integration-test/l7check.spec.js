import request from 'supertest'
import server from '../server'

describe.only ('Monitoring', () => {
  afterAll(() => {
    server.close()
  })

  describe('GET /monitor/l7check', () => {
    test('L7 status is OK', () => {
      return request(server)
        .get('/monitor/l7check')
        .expect(200)
    })
  })
})
