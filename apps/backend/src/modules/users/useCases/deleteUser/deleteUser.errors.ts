import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace DeleteUserErrors {
  export class UserNotFound extends UseCaseError {
    constructor(email: string) {
      super(`User with email ${email} was not found`);
    }
  }
}
