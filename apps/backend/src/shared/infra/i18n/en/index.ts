import { SignupErrors } from '../../../../modules/users/useCases/signup/signup.errors';
import type { BaseTranslation } from '../i18n-types';

const en = {
  errors: {
    users: {
      signup: SignupErrors.translations.en,
    },
  },
} satisfies BaseTranslation;

export default en;
