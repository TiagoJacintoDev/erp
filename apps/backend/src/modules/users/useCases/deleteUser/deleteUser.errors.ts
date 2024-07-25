import { type UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace DeleteUserErrors {
  export class UserNotFound implements UseCaseError {
    code: string;
    message: string;

    constructor(email: string) {
      this.message = `User with email ${email} was not found`;
      this.code = 'USER_NOT_FOUND';
    }
  }
}
