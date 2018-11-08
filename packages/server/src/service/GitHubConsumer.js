const { AuthenticationError } = require('apollo-server')
const OAuthConsumer = require('./OAuthConsumer')

class GitHubConsumer extends OAuthConsumer {
  async signup(accessToken) {
    let userInfo = {
      accessToken,
    }
    try {
      // TODO: Integration GitHub API to authentication
    } catch (err) {
      throw new AuthenticationError('Opps! Unauthorized token.')
    }
    return this.upsertUser(userInfo)
  }
}

module.exports = GitHubConsumer
