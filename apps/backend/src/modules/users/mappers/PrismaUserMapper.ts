import { type User as RawUser } from '@prisma/client';

import { User } from '../domain/user';
import { UserEmail } from '../domain/user-email';

export class PrismaUserMapper {
  static toDomain(raw: RawUser): User {
    return User.create({
      email: UserEmail.create(raw.email).unwrapValue(),
    });
  }

  static toPersistence(user: User): RawUser {
    return {
      email: user.email.value,
      id: user.id.toString(),
    };
  }
}
