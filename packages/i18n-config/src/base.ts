import * as fs from 'fs';
import { type ResourceKey } from 'i18next';
import * as path from 'path';

const zodBasePath = path.join(require.resolve('zod-i18n-map'), '../../locales');

const zodLocales = getDirectories(zodBasePath);

export const baseI18NextOptions = {
  fallbackLng: 'en',
  preload: zodLocales,
  resources: loadResources(zodBasePath, 'zod'),
};

function getDirectories(source: string) {
  return fs.readdirSync(source).filter((fileName) => {
    const joinedPath = path.join(source, fileName);
    const isDirectory = fs.lstatSync(joinedPath).isDirectory();

    return isDirectory;
  });
}

export function loadResources<T extends string>(localesPath: string, ns: T) {
  return getDirectories(localesPath).reduce(
    (acc, lng) => {
      acc[lng] = {
        [ns]: require(`${localesPath}/${lng}/${ns}.json`) as ResourceKey,
      } as Record<T, ResourceKey>;

      return acc;
    },
    {} as Record<string, { [key in T]: ResourceKey }>,
  );
}
