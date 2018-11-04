const { getUser } = require('./user')

const context = async ({
  ctx: {
    req: { headers },
  },
}) => {
  const user = await getUser(headers.authorization)
  return {
    user,
  }
}

module.exports = context
