module.exports = {
  testMatch: ['**/(*.)(spec|test).{js,jsx}'],
  bail: true,
  useStderr: true,
  testEnvironment: 'node',
  globalSetup: '<rootDir>/__tests__/environments/setup.js',
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^__tests__(.*)$': '<rootDir>/__tests__$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
