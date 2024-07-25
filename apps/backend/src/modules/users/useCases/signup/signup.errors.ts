import { type UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace SignupErrors {
  export class EmailAlreadyExistsError implements UseCaseError {
    code: string;
    message: string;

    constructor(email: string) {
      this.message = `The email ${email} is already in use`;
      this.code = 'SIGNUP_ERROR_EMAIL_ALREADY_EXISTS';
    }
  }
}
