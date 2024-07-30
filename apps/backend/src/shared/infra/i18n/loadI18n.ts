import fs from 'fs';
import i18next from 'i18next';
import Backend, { type FsBackendOptions } from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

const basePath = path.join(__dirname, './locales');

const zodBasePath = path.join(require.resolve('zod-i18n-map'), '../../locales');

function getDirectories(source: string) {
  return fs.readdirSync(source).filter((fileName) => {
    const joinedPath = path.join(source, fileName);
    const isDirectory = fs.lstatSync(joinedPath).isDirectory();

    return isDirectory;
  });
}

void i18next
  .use(middleware.LanguageDetector)
  .use(Backend)
  .init<FsBackendOptions>({
    initImmediate: false,
    fallbackLng: 'en',
    preload: [...getDirectories(basePath), ...getDirectories(zodBasePath)],
    backend: {
      loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.json'),
    },
  });

getDirectories(zodBasePath).forEach((lng) =>
  i18next.addResourceBundle(lng, 'zod', require(`zod-i18n-map/locales/${lng}/zod.json`)),
);
