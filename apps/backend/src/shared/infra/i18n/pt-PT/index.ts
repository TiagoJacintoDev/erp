import { SignupErrors } from '../../../../modules/users/useCases/signup/signup.errors';
import type { Translation } from '../i18n-types';

const pt_PT = {
  errors: {
    users: {
      signup: SignupErrors.translations['pt-PT'],
    },
  },
} satisfies Translation;

export default pt_PT;
