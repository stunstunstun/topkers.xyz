const { SERVICE_TYPE, SOURCE } = require('./constants')
const { connectDatabase, closeDatabase } = require('./mongodb')
const User = require('./models/user.model')
const Post = require('./models/post.model')

module.exports = {
  SERVICE_TYPE,
  SOURCE,
  connectDatabase,
  closeDatabase,
  User,
  Post,
}
