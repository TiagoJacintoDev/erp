import type express from 'express';

import { ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { type SignupDTO } from './signup.dto';
import { SignupErrors } from './signup.errors';
import { type SignupUseCase } from './signup.use-case';

export class SignupController extends BaseController {
  constructor(private readonly useCase: SignupUseCase) {
    super();
  }

  protected async executeImpl(req: express.Request, res: express.Response): Promise<unknown> {
    const dto = req.body as SignupDTO;

    const result = await this.useCase.execute(dto);

    if (result.isErr()) {
      const error = result.error;

      const errorsTranslation = req.t.errors.users.signup;

      switch (true) {
        case error instanceof SignupErrors.EmailAlreadyExists:
          return this.conflict(res, errorsTranslation.EmailAlreadyExists({ email: error.email }));
        case error instanceof ValidationError:
          return this.fail(res, error.message);
        default:
          return this.fail(res, 'An unexpected error occurred.');
      }
    }

    return this.ok(res, null);
  }
}
