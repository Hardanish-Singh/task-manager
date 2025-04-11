export default {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  coverageDirectory: 'test-output/jest/coverage',
  coverageReporters: ['html', 'text'],
  // Optionally include/exclude specific files
  collectCoverageFrom: ['**/*.tsx', '!**/*.spec.ts'],
};
