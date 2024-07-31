import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { mergeDeepLeft } from 'ramda';
import { initReactI18next } from 'react-i18next';

import { baseI18NextOptions, loadResources } from './base.js';

const initReactI18n = (localesPath: string) =>
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      ...baseI18NextOptions,
      interpolation: {
        escapeValue: false,
      },
      resources: mergeDeepLeft(
        baseI18NextOptions.resources,
        loadResources(localesPath, 'translation'),
      ),
    });

export { initReactI18n };
