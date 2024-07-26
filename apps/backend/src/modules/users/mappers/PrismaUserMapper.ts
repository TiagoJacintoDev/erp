import { type User as RawUser } from '@prisma/client';

import { RepositoryMapper } from '../../../shared/infra/adapters/RepositoryMapper';
import { User } from '../domain/user';
import { UserEmail } from '../domain/user-email';
import { UserPassword } from '../domain/user-password';
import { type PasswordHasher } from '../services/hasher/passwordHasher.service';

export class PrismaUserMapper extends RepositoryMapper<User, RawUser> {
  constructor(private readonly hasher: PasswordHasher) {
    super();
  }

  toDomain(raw: RawUser): User {
    return User.create({
      email: UserEmail.create(raw.email).unwrapValue(),
      password: UserPassword.create({ value: raw.password, hashed: true }).unwrapValue(),
      isAccountConfirmed: raw.isAccountConfirmed,
    });
  }

  async toPersistence(user: User): Promise<RawUser> {
    const hashedPassword = await user.password.getHashed(this.hasher);

    return {
      id: user.id.toString(),
      email: user.email.value,
      password: hashedPassword,
      isAccountConfirmed: user.isAccountConfirmed,
    };
  }
}
