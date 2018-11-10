const Koa = require('koa')
const jwt = require('koa-jwt')
const { bodyParserGraphQL } = require('body-parser-graphql')
const koaMorgan = require('koa-morgan')
const { ApolloServer } = require('apollo-server-koa')
const config = require('@githubjobs/config')
const schema = require('src/graphql')
const context = require('src/context')

class App {
  constructor() {
    this.apolloServer = new ApolloServer({
      schema,
      context,
      introspection: true,
      playground: true,
      debug: true,
      tracing: true,
    })
    this.koaApp = new Koa()
    this.middlewares()
  }

  middlewares() {
    this.apolloServer.applyMiddleware({ app: this.koaApp })
    this.koaApp.use(jwt({ secret: config.jwtSecretKey })).use(bodyParserGraphQL())
    this.koaApp.use(koaMorgan('combined'))
  }
}

module.exports = new App().koaApp
