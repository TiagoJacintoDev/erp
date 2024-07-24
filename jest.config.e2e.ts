import { type Config } from 'jest';

import baseConfig from './jest.config.base';

export default {
  ...baseConfig,
  testMatch: ['**/(src|test|tests|__test__|__tests__)/**/*.e2e.(spec|test).ts'],
  // Run one at a time to avoid port conflicts
  maxWorkers: 1,
} satisfies Config;
