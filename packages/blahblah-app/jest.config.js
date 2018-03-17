module.exports = {
  cacheDirectory: '.cache/jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  bail: true,
  verbose: true,
  transformIgnorePatterns: [
    '!node_modules/react-runtime'
  ],
}
