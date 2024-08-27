import { type ValidationErrorDefinition } from '@erp/shared/src/api';
import { HttpStatusCode } from '@erp/shared/src/constants/HttpStatusCode';
import type express from 'express';
import z from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

import { exitFn } from '../../../utils/exitFn';
import { ApiError } from '../ApiError';

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
  z.setErrorMap(
    makeZodI18nMap({
      t: req.t,
    }),
  );

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
