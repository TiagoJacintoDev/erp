import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { type ModuleErrorsTranslation } from '../../../../shared/infra/i18n/i18n-module-types';

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
      EmailAlreadyExists: 'User with email {email:string} already exists',
    },
    'pt-PT': {
      EmailAlreadyExists: 'O utilizador com email {email} já existe',
    },
  } satisfies ModuleErrorsTranslation<'users', 'signup'>;
}
