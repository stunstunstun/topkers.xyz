const jwt = require('jsonwebtoken')
const { User } = require('@githubjobs/domain')
const config = require('@githubjobs/config')
const logger = require('src/logger')

const TOKEN_TYPE = 'Bearer'

const getUser = async authorization => {
  try {
    if (!authorization) return null
    const [type, token] = authorization.split(' ')
    if (!(type === TOKEN_TYPE && token)) {
      return null
    }
    const { id, serviceType } = jwt.verify(token, config.jwtSecretKey)
    return User.findOne({
      id,
      serviceType,
    })
  } catch (error) {
    logger.error(error)
    return null
  }
}

module.exports = {
  getUser,
}
