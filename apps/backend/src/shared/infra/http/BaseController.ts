import type * as express from 'express';

import { ApiError } from './ApiError';

export abstract class BaseController {
  protected abstract executeImpl(req: express.Request, res: express.Response): Promise<unknown>;

  public async execute(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    // sends any error to the error handler middleware
    await this.executeImpl(req, res).catch(next);
  }

  protected static successResponse<T>(res: express.Response, code: number, data?: T) {
    res.type('application/json');

    const response = {
      success: true,
      data,
    };

    return res.status(code).json(response);
  }

  protected static errorResponse(res: express.Response, code: number, error: Error | string) {
    throw new ApiError({
      message: error instanceof Error ? error.message : error,
      status: code,
    });
  }

  protected ok(res: express.Response, dto: unknown) {
    return BaseController.successResponse(res, 200, dto);
  }

  protected created(res: express.Response) {
    return BaseController.successResponse(res, 201);
  }

  protected clientError(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 400, error ?? 'Unauthorized');
  }

  protected unauthorized(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 401, error ?? 'Unauthorized');
  }

  protected paymentRequired(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 402, error ?? 'Payment required');
  }

  protected forbidden(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 403, error ?? 'Forbidden');
  }

  protected notFound(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 404, error ?? 'Not found');
  }

  protected conflict(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 409, error ?? 'Conflict');
  }

  protected tooMany(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 429, error ?? 'Too many requests');
  }

  protected todo(res: express.Response) {
    return BaseController.errorResponse(res, 400, 'TODO');
  }

  protected fail(res: express.Response, error: Error | string) {
    return BaseController.errorResponse(res, 500, error);
  }
}
