module.exports = {
  testMatch: [
    '**/__tests__/?(*.)(spec|test).{js}',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  bail: true,
  notify: true,
  verbose: true,
  useStderr: true,
}
