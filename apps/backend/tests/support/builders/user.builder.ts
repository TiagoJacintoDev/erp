import { faker } from '@faker-js/faker';

import { type SignupDTO } from '../../../src/modules/users/useCases/signup/signup.dto';
import { Builder } from '../Builder';

export class UserBuilder extends Builder<SignupDTO> {
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
}
