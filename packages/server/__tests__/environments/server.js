const { createServer } = require('http')
const { connectDatabase } = require('@githubjobs/domain')
const app = require('src/app')

connectDatabase().catch(err => logger.error(`Opps! What's wrong with ${err}`))

const integrationServer = createServer(app.callback())
integrationServer.listen(0, 'localhost')

module.exports = integrationServer
