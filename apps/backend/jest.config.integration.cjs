/** @type {import('jest').Config} */
module.exports = {
  ...require('@erp/jest-config/integration'),
  displayName: 'Backend (Integration)',
  globalSetup: './tests/support/globalDevEnvTestSetup.ts',
};
