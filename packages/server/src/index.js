const { connectDatabase } = require('@hashtags/domain')
const config = require('@hashtags/config')
const logger = require('src/logger')
const app = require('./app')

connectDatabase()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`✨  Server is running on port ${config.port} (..)`)
    })
    app.on('error', err => {
      logger.error(err)
    })
  })
  .catch(err => logger.error(`Opps! What's wrong with ${err}`))
