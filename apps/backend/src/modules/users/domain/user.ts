import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { type UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserCreatedEvent } from './events/userCreated.event';
import { type UserEmail } from './user-email';

type UserProps = {
  email: UserEmail;
};

export class User extends AggregateRoot<UserProps> {
  get email() {
    return this.props.email;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    const isNewUser = !id;

    if (isNewUser) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}
