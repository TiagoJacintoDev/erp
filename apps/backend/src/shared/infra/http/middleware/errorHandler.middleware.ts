import { type ErrorResponse } from '@sms/shared/src/api';
import type express from 'express';

import { ApiError } from '../ApiError';

export function errorHandler(
  error: ApiError | Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  const errorStatusCode = error instanceof ApiError ? error.status : 500;

  res.locals.error = {
    id: Math.floor(Math.random() * 1000000),
    name: error.name,
    message: error.message,
    stack: error.stack,
  };

  const response: ErrorResponse<{ name: string; message: string }> = {
    success: false,
    error,
  };

  res.status(errorStatusCode).json(response);
}
