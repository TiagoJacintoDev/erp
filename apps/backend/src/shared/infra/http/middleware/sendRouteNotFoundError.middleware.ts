import { HttpStatusCode } from '@sms/shared/src/constants/HttpStatusCode';
import type express from 'express';

import { ApiError } from '../ApiError';

export function sendRouteNotFoundError(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  next(
    new ApiError({
      name: 'EndpointNotFound',
      message: 'Endpoint not found',
      status: HttpStatusCode.NOT_FOUND_404,
    }),
  );
}
