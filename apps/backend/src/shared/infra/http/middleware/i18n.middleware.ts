import i18next from 'i18next';
import middleware from 'i18next-http-middleware';

import '../../i18n/loadI18n';

export const i18nMiddleware = middleware.handle(i18next);
