const jwt = require('jsonwebtoken')
const { SERVICE_TYPE, User } = require('@githubjobs/domain')
const config = require('@githubjobs/config')

class OAuthConsumer {
  constructor(serviceType) {
    this._serviceType = serviceType
  }

  get serviceType() {
    return SERVICE_TYPE[this._serviceType]
  }

  async signup() {
    throw new Error(`Something is wrong with ${this.serviceType}`)
  }

  async upsertUser(userInfo) {
    const { id } = userInfo
    if (!id) {
      throw new Error(`id is required`)
    }
    const { serviceType } = this
    const token = jwt.sign({ id, serviceType }, config.jwtSecretKey)
    const result = await User.findOneAndUpdate(
      {
        id,
        serviceType,
      },
      {
        $set: {
          id,
          serviceType,
          userInfo,
          token,
        },
        $setOnInsert: {
          created: new Date(),
        },
      },
      {
        setDefaultsOnInsert: true,
        upsert: true,
        new: true,
      },
    )
    return result
  }
}

module.exports = OAuthConsumer
