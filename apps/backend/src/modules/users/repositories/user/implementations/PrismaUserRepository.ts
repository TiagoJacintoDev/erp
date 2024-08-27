import { DomainEvents } from '@/src/shared/domain/events/DomainEvents';
import { type UniqueEntityID } from '@/src/shared/domain/UniqueEntityID';
import { type PrismaClient } from '@prisma/client';
import { type AsyncMaybe } from '@sms/shared/src/core/Maybe';

import { type User } from '../../../domain/user';
import { type UserEmail } from '../../../domain/user-email';
import { type PrismaUserMapper } from '../../../mappers/PrismaUserMapper';
import { type UserRepository } from '../user.repository';

export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly client: PrismaClient,
    private readonly mapper: PrismaUserMapper,
  ) {}

  async findByEmail(email: UserEmail): AsyncMaybe<User> {
    const rawUser = await this.client.user.findUnique({
      where: { email: email.value },
    });

    if (!rawUser) {
      return null;
    }

    return this.mapper.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    await this.client.user.create({
      data: await this.mapper.toPersistence(user),
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

    return this.mapper.toDomain(rawUser);
  }
}
