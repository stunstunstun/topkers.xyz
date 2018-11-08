const { SERVICE_TYPE } = require('@githubjobs/domain')
const GitHubConsumer = require('../GitHubConsumer')
const EmailConsumer = require('../EmailConsumer')

const createConsumer = serviceType => {
  switch (SERVICE_TYPE[serviceType]) {
    case SERVICE_TYPE.GITHUB:
      return new GitHubConsumer(serviceType)
    case SERVICE_TYPE.EMAIL:
      return new EmailConsumer(serviceType)
    default:
      throw new Error(`OAuthConsumer type ${serviceType} is not defined.`)
  }
}

module.exports = {
  createConsumer,
}
