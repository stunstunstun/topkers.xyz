const mongoose = require('mongoose')
const config = require('@hashtags/config')
const logger = require('./logger')

const connection = mongoose.connection
connection.on('error', err => {
  logger.error(`Opps! Occur connection error with ${err}`)
})
connection.once('open', () => {
  logger.info(`✨  Mongodb connection has been opened.`)
})

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('debug', config.mongooseDebug)

const connectDatabase = async (options = { keepAlive: 1, useNewUrlParser: true }) => {
  logger.info(config.mongoUri)
  return mongoose.connect(config.mongoUri, options)
}

const closeDatabase = async () => {
  await mongoose.connection.close()
}

module.exports = {
  connectDatabase,
  closeDatabase,
}
