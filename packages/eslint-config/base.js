/** @type {import("eslint").Linter.Config} */
module.exports = {
  parserOptions: {
    project: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers', 'jest'],
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignorePrimitives: {
          bigint: true,
          number: true,
          string: true,
        },
      },
    ],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'jest/unbound-method': 'error',
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
          arguments: false,
          returns: false,
        },
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['module', ['parent', 'sibling'], 'index'],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  ignorePatterns: ['node_modules', 'dist', 'build', '.eslintrc.cjs'],
};
