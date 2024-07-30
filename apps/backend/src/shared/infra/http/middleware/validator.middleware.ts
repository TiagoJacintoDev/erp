import { type ValidationErrorDefinition } from '@sms/shared/src/api';
import { HttpStatusCode } from '@sms/shared/src/constants/HttpStatusCode';
import type express from 'express';
import i18next, { t } from 'i18next';
import z from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

import { exitFn } from '../../../utils/exitFn';
import { type Locales } from '../../i18n/i18n-types';
import { ApiError } from '../ApiError';

const getLocaleAt: Record<Locales, string> = {
  en: 'en',
  'pt-PT': 'pt',
};

const enum ContentType {
  JSON = 'application/json',
  XML = 'application/xml',
  URL_ENCODED = 'application/x-www-form-urlencoded',
  TEXT = 'text/plain',
}

const supportedContentTypes: ContentType[] = [ContentType.JSON];

export class BodyValidationError extends ApiError {
  constructor(public readonly errors: ValidationErrorDefinition['errors']) {
    super({
      name: 'ValidationError',
      message: 'Validation error',
      status: HttpStatusCode.BAD_REQUEST_400,
    });
  }
}

export async function validatorMiddleware(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  const translation = (await import(
    `zod-i18n-map/locales/${getLocaleAt[req.language]}/zod.json`
  )) as Record<string, string>;

  await i18next.init({
    lng: req.language,
    resources: {
      [req.language]: {
        zod: translation,
      },
    },
  });

  const zodI18nMap = makeZodI18nMap({
    t: t,
  });

  z.setErrorMap(zodI18nMap);

  req.parseBody = <T>(schema: z.ZodType<T>) => {
    const contentType = req.headers['content-type'];

    if (!contentType) {
      next(
        new ApiError({
          message: 'Content-Type not provided',
          status: HttpStatusCode.BAD_REQUEST_400,
        }),
      );
      exitFn();
    }

    const isSupported = supportedContentTypes.some((t) => t === contentType);
    if (!isSupported) {
      next(
        new ApiError({
          message: 'Content-Type not supported',
          status: HttpStatusCode.UNSUPPORTED_MEDIA_TYPE_415,
        }),
      );
      exitFn();
    }

    try {
      return schema.parse(req.body);
    } catch (e) {
      const error = e as z.ZodError;

      next(new BodyValidationError(error.errors));
      exitFn();
    }
  };

  next();
}
