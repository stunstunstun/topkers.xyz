const env = {
  development: {
    GRAPHQL_ENDPOINT: 'http://localhost:10080',
  },
  production: {
    GRAPHQL_ENDPOINT: 'https://githubjobs.herokuapp.com/graphql',
  },
}

const configs = env[process.env.NODE_ENV || 'development']

module.exports = {
  ...configs,
}
