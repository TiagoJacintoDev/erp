import { config } from '../../../shared/infra/config';
import { BCryptPasswordHasher } from './hasher/implementations/BcryptPasswordHasher';
import { FakePasswordHasher } from './hasher/implementations/FakePasswordHasher';
import { type PasswordHasher } from './hasher/passwordHasher.service';

let passwordHasher: PasswordHasher;

if (config.shouldBuildFakeDependency) {
  passwordHasher = new FakePasswordHasher();
} else {
  passwordHasher = new BCryptPasswordHasher();
}

export { passwordHasher };
