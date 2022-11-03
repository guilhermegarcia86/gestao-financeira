const defaultConfigs = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
    'lcov'
  ],
  watchPathIgnorePatterns: [
    'node_modules'
  ],
  transformIgnorePatterns: [
    'node_modules'
  ],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true
}

module.exports = {
  projects: [
    {
      ...defaultConfigs,
      testEnvironment: 'node',
      displayName: 'unit',
      testMatch: [
        '**/tests/**/*.spec.ts'
      ]
    },
    {
      ...defaultConfigs,
      displayName: 'integration',
      testMatch: [
        '**/tests/**/*.test.ts'
      ],
      globalSetup: '<rootDir>/tests/integration/setup.ts',
      globalTeardown: '<rootDir>/tests/integration/teardown.ts'
    }
  ]
}
