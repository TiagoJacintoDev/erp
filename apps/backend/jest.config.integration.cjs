/** @type {import('jest').Config} */
module.exports = {
  ...require('@sms/jest-config/integration'),
  displayName: 'Backend (Integration)',
  globalSetup: './tests/support/globalDevEnvTestSetup.ts',
};
