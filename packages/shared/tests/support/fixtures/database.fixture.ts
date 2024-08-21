import { SignupDTO } from '../../../src/modules/users/signup/signup.dto';
import { type CompositionRoot } from 'backend/src/shared/infra/CompositionRoot';

export class DatabaseFixture {
  constructor(private readonly composition: CompositionRoot) {}

  async resetDatabase() {
    const connection = this.composition.getDatabase().getConnection();

    try {
      await connection.$transaction([]);
    } catch (error) {
      console.error(error);
    }
  }

  async setupWithExistingUsersFromCommands(commands: SignupDTO[]) {
    const application = this.composition.getApplication();

    for (let command of commands) {
      await application.users.useCases.deleteUser.execute({
        email: command.email,
      });
    }

    for (let command of commands) {
      await application.users.useCases.signup.execute(command);
    }
  }
}
