module.exports = {
  cacheDirectory: '.cache/jest',
  testMatch: [
    '**/?(*.)(spec|test).{js,jsx}',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.css$': '../../config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '../../config/jest/fileTransform.js',
  },
  bail: true,
  verbose: true,
}