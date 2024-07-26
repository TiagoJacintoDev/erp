import type express from 'express';
import {
  initAcceptLanguageHeaderDetector,
  initRequestParametersDetector,
} from 'typesafe-i18n/detectors';

import L from './i18n-node';
import { detectLocale, locales } from './i18n-util';

export const i18nMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const requestParametersDetector = initRequestParametersDetector(req, 'locale');
  const headers = {
    get: (key: string) => req.headers[key] as string,
  };
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector({ headers });

  const locale = detectLocale(requestParametersDetector, acceptLanguageDetector);

  req.language = locale;
  req.languages = locales;
  req.t = L[locale];

  next();
};
