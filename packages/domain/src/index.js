const { SERVICE_TYPE } = require('./constants')
const { connectDatabase, closeDatabase } = require('./mongodb')
const User = require('./models/user.model')

module.exports = {
  SERVICE_TYPE,
  connectDatabase,
  closeDatabase,
  User,
}
