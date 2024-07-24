import { type Config } from 'jest';

import baseConfig from '../../jest.config.integration';

export default {
  ...baseConfig,
  displayName: 'Backend (Integration)',
  globalSetup: './tests/support/globalDevEnvTestSetup.ts',
} satisfies Config;
