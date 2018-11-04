const { schemaComposer, EnumTypeComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { AuthenticationError } = require('apollo-server')
const { User } = require('@githubjobs/domain')

const typeComposer = composeWithMongoose(User, {})

EnumTypeComposer.create('enum OAuthProvider { GITHUB, FACEBOOK }')

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
  args: { type: 'OAuthProvider', data: 'String' },
  resolve: async ({ args: { type, data } }) => {
    // TODO:
  },
})

schemaComposer.Query.addFields({
  me: typeComposer.get('$me'),
})

schemaComposer.Mutation.addFields({
  signup: typeComposer.get('$signup'),
  updateById: typeComposer.getResolver('updateById'),
})

module.exports = {}
