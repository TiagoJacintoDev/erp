import { type Config } from 'jest';

import baseConfig from './jest.config.base';

export default {
  ...baseConfig,
  testMatch: ['**/(src|test|tests|__test__|__tests__)/**/*.(test|spec).ts'],
} satisfies Config;
