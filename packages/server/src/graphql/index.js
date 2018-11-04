const { schemaComposer } = require('graphql-compose')

require('./user')

module.exports = schemaComposer.buildSchema()
