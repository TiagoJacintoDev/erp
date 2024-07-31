/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: '@sms/eslint-config/base',
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
  },
};
