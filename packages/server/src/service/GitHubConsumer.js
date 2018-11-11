const request = require('r2')
const { AuthenticationError } = require('apollo-server')
const OAuthConsumer = require('./OAuthConsumer')

class GitHubConsumer extends OAuthConsumer {
  async signup(code) {
    const token = await request.post('https://github.com/login/oauth/access_token', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      json: {
        client_id: 'f019324be3bbc0bf8f53',
        client_secret: '3766aa120263fc305568f645d32b90dde92d7cb8',
        code,
      },
    }).json
    const { error, access_token } = token
    if (error) {
      throw new AuthenticationError(`Opps! Unauthorized token with ${error}`)
    }
    const user = await request.get(`https://api.github.com/user?access_token=${access_token}`).json
    return this.upsertUser(user)
  }
}

module.exports = GitHubConsumer
