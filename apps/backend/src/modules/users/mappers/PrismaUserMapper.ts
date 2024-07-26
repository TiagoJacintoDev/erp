import { type User as RawUser } from '@prisma/client';

import { User } from '../domain/user';
import { UserEmail } from '../domain/user-email';
import { UserPassword } from '../domain/user-password';
import { type PasswordHasher } from '../services/hasher/passwordHasher.service';

export class PrismaUserMapper {
  static toDomain(raw: RawUser): User {
    return User.create({
      email: UserEmail.create(raw.email).unwrapValue(),
      password: UserPassword.create({ value: raw.password, hashed: true }).unwrapValue(),
      isAccountConfirmed: raw.isAccountConfirmed,
    });
  }

  static async toPersistence(user: User, hasher: PasswordHasher): Promise<RawUser> {
    const hashedPassword = await user.password.getHashed(hasher);

    return {
      id: user.id.toString(),
      email: user.email.value,
      password: hashedPassword,
      isAccountConfirmed: user.isAccountConfirmed,
    };
  }
}
