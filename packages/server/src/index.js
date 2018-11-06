const Koa = require('koa')
const jwt = require('koa-jwt')
const { bodyParserGraphQL } = require('body-parser-graphql')
const koaMorgan = require('koa-morgan')
const { ApolloServer } = require('apollo-server-koa')
const { connectDatabase } = require('@githubjobs/domain')
const config = require('@githubjobs/config')
const schema = require('src/graphql')
const context = require('src/context')
const logger = require('src/logger')

connectDatabase().catch(err => logger.error(`Opps! What's wrong with ${err}`))

const app = new Koa()
const apolloServer = new ApolloServer({
  schema,
  context,
})
apolloServer.applyMiddleware({ app })

app
  .use(jwt({ secret: config.jwtSecretKey }))
  .use(bodyParserGraphQL())
  .use(koaMorgan('combined'))

app.listen(config.port, () => {
  logger.info(`✨  Server is running on port ${config.port} (..)`)
})

app.on('error', err => {
  logger.error(err)
})

module.exports = app
