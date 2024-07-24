/**
 * There is no way Typescript replaces paths (aliases) defined in the <root>/tsconfig.json in the production code.
 * Therefore, we need to do it manually. This file contains an imports replacer for the tsc-alias package,
 * which can be used as a post-processing step in the build process.
 */

const replacements = [
  ['@sms/shared/src', '@sms/shared/dist'],
  ['@sms/backend/src', '@sms/backend/dist'],
];

/**
 * tsc-alias only supports commonjs replacers.
 * @param {{orig:string}}
 * @returns {string}
 */
exports.default = function tsAliasesReplacer({ orig: originalImport }) {
  let newImport = originalImport;

  replacements.forEach(([fromRule, toRule]) => {
    newImport = newImport.replace(fromRule, toRule);
  });

  return newImport;
};
