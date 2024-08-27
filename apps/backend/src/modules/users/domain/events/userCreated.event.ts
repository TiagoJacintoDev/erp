import { type DomainEvent } from '@/src/shared/domain/events/DomainEvent';
import { type UniqueEntityID } from '@/src/shared/domain/UniqueEntityID';

import { type User } from '../user';

export class UserCreatedEvent implements DomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
