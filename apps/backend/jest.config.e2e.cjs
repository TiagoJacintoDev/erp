/** @type {import('jest').Config} */
module.exports = {
  ...require('@erp/jest-config/e2e'),
  displayName: 'Backend (E2E)',
  globalSetup: './tests/support/globalDevEnvTestSetup.ts',
};
