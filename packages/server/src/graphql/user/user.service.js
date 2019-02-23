const { SERVICE_TYPE } = require('@hashtags/domain')
const GitHubConsumer = require('src/service/GitHubConsumer')
const EmailConsumer = require('src/service/EmailConsumer')

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
