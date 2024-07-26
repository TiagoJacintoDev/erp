import { faker } from '@faker-js/faker';
import { type SignupDTO } from '@sms/shared/src/modules/users/signup/signup.dto';

import { type ConfirmAccountDTO } from '../../../src/modules/users/useCases/confirm-account/confirmAccount.dto';
import { Builder } from '../Builder';

export class UserBuilder {
  static Signup = class extends Builder<SignupDTO> {
    constructor() {
      super({
        default: {
          email: '',
          password: '',
        },
        random: {
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
    }
  };

  static ConfirmAccount = class extends Builder<ConfirmAccountDTO> {
    constructor() {
      super({
        default: {
          email: '',
        },
        random: {
          email: faker.internet.email(),
        },
      });
    }
  };
}
