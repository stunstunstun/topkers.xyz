const { AuthenticationError } = require('apollo-server')
const OAuthConsumer = require('./OAuthConsumer')

class EmailConsumer extends OAuthConsumer {
  async signup(email) {
    let userInfo = {
      id: email,
      email,
    }
    try {
      // TODO: Send email to verification
    } catch (err) {
      throw new AuthenticationError('Opps! Unauthorized token.')
    }
    return this.upsertUser(userInfo)
  }
}

module.exports = EmailConsumer
