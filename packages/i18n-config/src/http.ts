import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import { mergeDeepLeft } from 'ramda';

import { baseI18NextOptions, loadResources } from './base';

const initHttpI18n = (localesPath: string) =>
  i18next.use(middleware.LanguageDetector).init({
    ...baseI18NextOptions,
    resources: mergeDeepLeft(
      baseI18NextOptions.resources,
      loadResources(localesPath, 'translation'),
    ),
  });

export { initHttpI18n };
