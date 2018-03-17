module.exports = {
  cacheDirectory: '.cache/jest',
  testMatch: [
    '**/?(*.)(spec|test).{js,jsx}',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  bail: true,
  verbose: true,
  useStderr: true,
  collectCoverageFrom: [
    '**/packages/src/*.{js,jsx}',
  ],
  coverageDirectory: './coverage/',
}