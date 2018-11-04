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

const DEFAULT_PORT = 9000
const PORT = process.env.PORT || DEFAULT_PORT

connectDatabase()
  .then(() => logger.info('✨  It has connected to database successfully!'))
  .catch(err => logger.error(err))

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

app.listen(PORT, () => {
  logger.info(`✨  Server is running on port ${PORT} (..)`)
})

app.on('error', err => {
  logger.error(err)
})

module.exports = app
