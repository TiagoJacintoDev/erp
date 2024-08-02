import { type ErrorResponse } from '@sms/shared/src/api';
import type express from 'express';

import { ApiError } from '../ApiError';

export function errorHandler(
  error: ApiError | Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  res.locals.error = {
    id: Math.floor(Math.random() * 1000000),
    name: error.name,
    message: error.message,
    stack: error.stack,
  };

  const name = error instanceof ApiError ? error.name : 'InternalServerError';
  const message = error instanceof ApiError ? error.message : 'Internal server error';

  const response: ErrorResponse<{ name: string; message: string }> = {
    error: {
      ...error,
      name,
      message,
    },
  };

  const statusCode = error instanceof ApiError ? error.status : 500;

  res.status(statusCode).json(response);
}
