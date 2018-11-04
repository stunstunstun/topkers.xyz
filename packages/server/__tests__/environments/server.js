const { createServer } = require('http')
const Koa = require('koa')
const jwt = require('koa-jwt')
const { ApolloServer } = require('apollo-server-koa')
const { bodyParserGraphQL } = require('body-parser-graphql')
const { connectDatabase } = require('@githubjobs/domain')
const config = require('@githubjobs/config')
const schema = require('src/graphql')
const context = require('src/context')

connectDatabase()

const app = new Koa()
const apolloServer = new ApolloServer({ schema, context })
apolloServer.applyMiddleware({ app })

app.use(jwt({ secret: config.jwtSecretKey })).use(bodyParserGraphQL())

const integrationServer = createServer(app.callback())
integrationServer.listen(0, 'localhost')

module.exports = integrationServer
