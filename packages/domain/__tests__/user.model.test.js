const sinon = require('sinon')
const { SERVICE_TYPE, User } = require('../src/index')
const fixtures = require('./fixtures/user')

require('sinon-mongoose')

describe('User model', () => {
  describe('Find with stub', () => {
    test('Should be return all entities', async () => {
      const stub = sinon.stub(User, 'find')
      stub.resolves([fixtures])

      const users = await User.find({ serviceType: SERVICE_TYPE.FACEBOOK })
      stub.restore()
      expect(Array.isArray(users)).toBeTruthy()
    })

    test('Should be return a entity', async () => {
      const stub = sinon.stub(User, 'findOne')
      stub.resolves(fixtures)
      const { id } = fixtures
      const user = await User.findOne({ id })
      stub.restore()
      expect(user.id).toEqual(id)
    })
  })
})
