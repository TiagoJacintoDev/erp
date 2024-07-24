import { type Config } from 'jest';

import baseConfig from '../../jest.config.e2e';

export default {
  ...baseConfig,
  displayName: 'Backend (E2E)',
  globalSetup: './tests/support/globalDevEnvTestSetup.ts',
} satisfies Config;
