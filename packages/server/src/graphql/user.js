const { schemaComposer, EnumTypeComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { AuthenticationError } = require('apollo-server')
const { SERVICE_TYPE, User } = require('@githubjobs/domain')
const { createConsumer } = require('src/service/user')

const typeComposer = composeWithMongoose(User, {})

EnumTypeComposer.create(`enum OAuthProvider { ${Object.keys(SERVICE_TYPE).join(', ')} }`)

typeComposer.addResolver({
  name: 'me',
  type: 'User',
  resolve: async ({ context }) => {
    const { user } = context
    if (!user) {
      throw new AuthenticationError('This endpoint requires you to be authenticated.')
    }
    return user
  },
})

typeComposer.addResolver({
  name: 'signup',
  type: 'User',
  args: { type: 'OAuthProvider', token: 'String' },
  resolve: async ({ args: { type, token } }) => createConsumer(type).signup(token),
})

schemaComposer.Query.addFields({
  me: typeComposer.get('$me'),
})

schemaComposer.Mutation.addFields({
  signup: typeComposer.get('$signup'),
  updateById: typeComposer.getResolver('updateById'),
})

module.exports = {}
