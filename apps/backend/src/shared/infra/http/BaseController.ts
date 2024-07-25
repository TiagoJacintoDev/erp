import type * as express from 'express';

export abstract class BaseController {
  protected abstract executeImpl(req: express.Request, res: express.Response): Promise<unknown>;

  public async execute(req: express.Request, res: express.Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      const message = 'An unexpected error occurred';

      if (err instanceof Error) {
        err.message = err.message + ' - ' + message;
        this.fail(res, err);
      }

      this.fail(res, message);
    }
  }

  public static successResponse<T>(res: express.Response, code: number, data?: T) {
    res.type('application/json');

    const response = {
      success: true,
      data,
    };

    return res.status(code).json(response);
  }

  public static errorResponse(res: express.Response, code: number, error: Error | string) {
    const response = {
      success: false,
      error,
    };

    res.locals.errorName = error instanceof Error ? error.name : 'UnknownError';
    res.locals.errorMessage = error instanceof Error ? error.message : error;

    return res.status(code).json(response);
  }

  public ok(res: express.Response, dto: unknown) {
    return BaseController.successResponse(res, 200, dto);
  }

  public created(res: express.Response) {
    return BaseController.successResponse(res, 201);
  }

  public clientError(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 400, error ?? 'Unauthorized');
  }

  public unauthorized(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 401, error ?? 'Unauthorized');
  }

  public paymentRequired(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 402, error ?? 'Payment required');
  }

  public forbidden(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 403, error ?? 'Forbidden');
  }

  public notFound(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 404, error ?? 'Not found');
  }

  public conflict(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 409, error ?? 'Conflict');
  }

  public tooMany(res: express.Response, error?: Error | string) {
    return BaseController.errorResponse(res, 429, error ?? 'Too many requests');
  }

  public todo(res: express.Response) {
    return BaseController.errorResponse(res, 400, 'TODO');
  }

  public fail(res: express.Response, error: Error | string) {
    return BaseController.errorResponse(res, 500, error);
  }
}
