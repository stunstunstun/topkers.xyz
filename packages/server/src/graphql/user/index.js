const { schemaComposer, EnumTypeComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { AuthenticationError } = require('apollo-server')
const { User, SERVICE_TYPE } = require('@githubjobs/domain')
const { createConsumer } = require('./user.service')

const userTypeComposer = composeWithMongoose(User, {})

EnumTypeComposer.create(`enum OAuthProvider { ${Object.keys(SERVICE_TYPE).join(',')} }`)

userTypeComposer.addResolver({
  name: 'me',
  type: userTypeComposer,
  resolve: async ({ context }) => {
    const { user } = context
    if (!user) {
      throw new AuthenticationError('This endpoint requires you to be authenticated.')
    }
    return user
  },
})

userTypeComposer.addResolver({
  name: 'signup',
  type: userTypeComposer,
  args: { type: 'OAuthProvider', token: 'String' },
  resolve: async ({ args: { type, token } }) => createConsumer(type).signup(token),
})

schemaComposer.Query.addFields({
  me: userTypeComposer.getResolver('me'),
})

schemaComposer.Mutation.addFields({
  signup: userTypeComposer.getResolver('signup'),
  updateById: userTypeComposer.getResolver('updateById'),
})
