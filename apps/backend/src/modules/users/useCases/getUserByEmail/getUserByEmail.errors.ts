import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace GetUserByEmailErrors {
  export class UserNotFound extends UseCaseError {
    constructor(email: string) {
      super(`User with email ${email} not found`);
    }
  }
}
