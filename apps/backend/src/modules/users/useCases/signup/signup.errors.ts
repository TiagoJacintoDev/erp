import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace SignupErrors {
  export class EmailAlreadyExistsError extends UseCaseError {
    constructor(email: string) {
      super(`The email ${email} is already in use`);
    }
  }
}
