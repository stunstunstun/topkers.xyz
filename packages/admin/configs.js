const env = {
  development: {
    COOKIE_NAME: 'gjs',
    DOMAIN: 'localhost',
    HOME: 'http://localhost:10000',
    CLIENT_ID: 'f019324be3bbc0bf8f53',
    GRAPHQL_ENDPOINT: 'http://localhost:10080/graphql',
  },
  production: {
    COOKIE_NAME: 'gjs',
    DOMAIN: 'hashtags.now.sh',
    HOME: 'https://hashtags.now.sh',
    CLIENT_ID: 'f019324be3bbc0bf8f53',
    GRAPHQL_ENDPOINT: 'https://hashtags.herokuapp.com/graphql',
  },
}

const configs = env[process.env.NODE_ENV || 'development']

module.exports = {
  ...configs,
}
