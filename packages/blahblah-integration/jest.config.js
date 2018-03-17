module.exports = {
  cacheDirectory: '.cache/jest',
  testMatch: ['**/__tests__/?(*.)(spec|test).{js}'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  bail: true,
  verbose: true,
}
