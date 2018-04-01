import request from 'supertest'
import server from '../../server'

describe('Posts', () => {
  afterAll(() => {
    server.close()
  })

  describe('GET /api/providers/:providerId', () => {
    test('Get devlog resources', async () => {
      const res = await request(server)
        .get('/api/providers/devlog/posts')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(Array.isArray(res.body)).toBeTruthy()
    })
    test('Get github trending resources', async () => {
      const res = await request(server)
        .get('/api/providers/github/posts')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(Array.isArray(res.body)).toBeTruthy()
    })
    test('Get reddit resources', async () => {
      const res = await request(server)
        .get('/api/providers/reddit/posts')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(Array.isArray(res.body)).toBeTruthy()
    })
  })
})
