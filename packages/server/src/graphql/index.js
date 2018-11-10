const { schemaComposer } = require('graphql-compose')

require('./user')
require('./post')

const graphqlSchema = schemaComposer.buildSchema()

module.exports = graphqlSchema
