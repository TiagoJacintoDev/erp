import { type PrismaClient } from '@prisma/client';
import { type AsyncMaybe } from '@sms/shared/src/core/Maybe';

import { DomainEvents } from '../../../../../shared/domain/events/DomainEvents';
import { type UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { type User } from '../../../domain/user';
import { type UserEmail } from '../../../domain/user-email';
import { PrismaUserMapper } from '../../../mappers/PrismaUserMapper';
import { type UserRepository } from '../user.repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async findByEmail(email: UserEmail): AsyncMaybe<User> {
    const rawUser = await this.client.user.findUnique({
      where: { email: email.value },
    });

    if (!rawUser) {
      return null;
    }

    return PrismaUserMapper.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    await this.client.user.create({
      data: PrismaUserMapper.toPersistence(user),
    });

    DomainEvents.dispatchEventsForAggregateWithID(user.id);
  }

  async findById(id: UniqueEntityID): AsyncMaybe<User> {
    const rawUser = await this.client.user.findUnique({
      where: {
        id: id.toString(),
      },
    });

    if (!rawUser) {
      return null;
    }

    return PrismaUserMapper.toDomain(rawUser);
  }
}
