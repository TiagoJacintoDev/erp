import type express from 'express';
import z from 'zod';

import { ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { SignupErrors } from './signup.errors';
import { type SignupUseCase } from './signup.use-case';

export class SignupController extends BaseController {
  constructor(private readonly useCase: SignupUseCase) {
    super();
  }

  protected async executeImpl(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<unknown> {
    const dto = z
      .object({
        email: z.string(),
        password: z.string(),
      })
      .parse(req.body);

    const result = await this.useCase.execute(dto);

    if (result.isErr()) {
      const error = result.error;

      const errorsTranslation = req.t.errors.users.signup;

      switch (true) {
        case error instanceof SignupErrors.EmailAlreadyExists:
          return this.conflict(
            res,
            next,
            errorsTranslation.EmailAlreadyExists({ email: error.email }),
          );
        case error instanceof ValidationError:
          return this.fail(res, next, error.message);
        default:
          return this.fail(res, next, 'An unexpected error occurred.');
      }
    }

    return this.ok(res, null);
  }
}
