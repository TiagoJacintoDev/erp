import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace SignupErrors {
  export class EmailAlreadyExists extends UseCaseError {
    readonly email: string;

    constructor(email: string) {
      super();
      this.email = email;
    }
  }

  export const translations = {
    en: {
      EmailAlreadyExists: 'The user with email {email} already exists',
    },
    'pt-PT': {
      EmailAlreadyExists: "O utilizador com o email '{email}' já existe",
    },
  };
}
