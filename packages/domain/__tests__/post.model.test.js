const sinon = require('sinon')
const { Post } = require('../src/index')
const fixtures = require('./fixtures/post')

require('sinon-mongoose')

describe('Post model', () => {
  describe('Find with stub', () => {
    test('Should be return all entities', async () => {
      const stub = sinon.stub(Post, 'find')
      stub.resolves([fixtures])

      const posts = await Post.find({ source: 'reddit' })
      stub.restore()
      expect(Array.isArray(posts)).toBeTruthy()
    })

    test('Should be return a entity', async () => {
      const stub = sinon.stub(Post, 'findOne')
      stub.resolves(fixtures)
      const { id } = fixtures
      const post = await Post.findOne({ id })
      stub.restore()
      expect(post.id).toEqual(id)
    })
  })
})
