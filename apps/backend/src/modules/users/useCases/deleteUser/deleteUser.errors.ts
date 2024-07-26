import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace DeleteUserErrors {
  export class UserNotFound extends UseCaseError {
    readonly email: string;

    constructor(email: string) {
      super();
      this.email = email;
    }
  }
}
