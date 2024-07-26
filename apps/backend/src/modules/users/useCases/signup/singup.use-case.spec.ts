import {
  type AlreadyCreatedAccountTable,
  testSignupFeature,
} from '@sms/shared/tests/modules/users/features/signup/loadSignupFeature';
import { DatabaseFixture } from '@sms/shared/tests/support/fixtures/database.fixture';

import { UserBuilder } from '../../../../../tests/support/builders/user.builder';
import { type UseCaseResponse } from '../../../../../tests/support/types/UseCaseResponse';
import { ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { CompositionRoot } from '../../../../shared/infra/CompositionRoot';
import { type SignupDTO } from './signup.dto';
import { SignupErrors } from './signup.errors';

type SignupResponse = UseCaseResponse<
  ReturnType<CompositionRoot['getApplication']>['users']['useCases']['signup']
>;

testSignupFeature('@backend', (test) => {
  let signupCommand: SignupDTO;
  let application: ReturnType<CompositionRoot['getApplication']>;
  let signupResponse: SignupResponse;
  let saveUserSpy: jest.SpyInstance;
  let sendEmailSpy: jest.SpyInstance;
  let databaseFixture: DatabaseFixture;

  beforeAll(async () => {
    const root = CompositionRoot.getInstance();

    databaseFixture = new DatabaseFixture(root);

    application = root.getApplication();

    saveUserSpy = jest.spyOn(application.users.repositories.user, 'save');
    sendEmailSpy = jest.spyOn(application.notifications.services.email, 'sendEmail');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Successful signup', ({ given, when, then, and }) => {
    given('I am a new user', () => {
      signupCommand = new UserBuilder().withRandomProps().build();
    });

    when('I register with valid account details', async () => {
      signupResponse = await application.users.useCases.signup.execute(signupCommand);
    });

    then('I should see a success message', async () => {
      expect(signupResponse.isOk()).toBeTrue();

      const createdUserOrError = await application.users.useCases.getUserByEmail.execute({
        email: signupCommand.email,
      });

      expect(createdUserOrError.isOk()).toBeTrue();
      const createdUser = createdUserOrError.unwrapValue();
      expect(signupCommand.email).toEqualCaseInsensitive(createdUser.email.value);

      expect(saveUserSpy).toHaveBeenCalledTimes(1);
    });

    and('I should receive a confirmation email', async () => {
      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    });
  });

  test('Invalid or missing registration details', ({ given, when, then, and }) => {
    given('I am a new user', () => {
      signupCommand = new UserBuilder().build();
    });

    when('I register with invalid account details', async () => {
      signupResponse = await application.users.useCases.signup.execute(signupCommand);
    });

    then('I should see an error notifying me that my input is invalid', () => {
      expect(signupResponse.isErr()).toBeTrue();
      expect(signupResponse.unwrapError()).toBeInstanceOf(ValidationError);

      expect(saveUserSpy).toHaveBeenCalledTimes(0);
    });

    and('I should not receive a confirmation email', () => {
      expect(sendEmailSpy).toHaveBeenCalledTimes(0);
    });
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    const commands: SignupDTO[] = [];
    const responses: SignupResponse[] = [];

    given('a set of users already created accounts', async (table: AlreadyCreatedAccountTable) => {
      table.forEach((row) => {
        commands.push(
          new UserBuilder()
            .overrideProps({
              email: row.email,
            })
            .build(),
        );
      });

      await databaseFixture.setupWithExistingUsersFromCommands(commands);
    });

    when('new users attempt to register with those emails', async () => {
      for (const command of commands) {
        await application.users.useCases.signup.execute(command);
      }
    });

    then('they should see an error notifying them that the account already exists', () => {
      for (const response of responses) {
        expect(response.isErr()).toBeTrue();
        expect(response.unwrapError()).toBeInstanceOf(SignupErrors.EmailAlreadyExists);
      }
    });

    and('they should not receive a confirmation email', () => {
      expect(sendEmailSpy).toHaveBeenCalledTimes(0);
    });
  });
});
