import { type AsyncMaybe } from '@sms/shared/src/core/Maybe';

import { DomainEvents } from '../../../../../shared/domain/events/DomainEvents';
import { type UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { type User } from '../../../domain/user';
import { type UserEmail } from '../../../domain/user-email';
import { type UserRepository } from '../user.repository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async findByEmail(email: UserEmail): AsyncMaybe<User> {
    return this.users.find((user) => user.email.equals(email));
  }

  async save(user: User): Promise<void> {
    this.users.push(user);

    DomainEvents.dispatchEventsForAggregateWithID(user.id);
  }

  async findById(id: UniqueEntityID): AsyncMaybe<User> {
    return this.users.find((user) => user.id.equals(id));
  }
}
