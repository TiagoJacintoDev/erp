import { type Config } from 'jest';

import baseConfig from '../../jest.config.unit';

export default {
  ...baseConfig,
  displayName: 'Backend (Unit)',
} satisfies Config;
