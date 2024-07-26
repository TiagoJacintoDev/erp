import { config } from '../../../shared/infra/config';
import { database } from '../../../shared/infra/database';
import { passwordHasher } from '../services';
import { InMemoryUserRepository } from './user/implementations/InMemoryUserRepository';
import { PrismaUserRepository } from './user/implementations/PrismaUserRepository';
import { type UserRepository } from './user/user.repository';

let userRepository: UserRepository;

if (config.shouldBuildFakeDependency()) {
  userRepository = new InMemoryUserRepository();
} else {
  userRepository = new PrismaUserRepository(database.getConnection(), passwordHasher);
}

export { userRepository };
