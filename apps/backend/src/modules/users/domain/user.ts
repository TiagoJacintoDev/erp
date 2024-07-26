import { type SetOptional } from 'type-fest';

import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { type UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserCreatedEvent } from './events/userCreated.event';
import { type UserEmail } from './user-email';
import { type UserPassword } from './user-password';

type UserProps = {
  email: UserEmail;
  password: UserPassword;
  isAccountConfirmed: boolean;
};

export class User extends AggregateRoot<UserProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get isAccountConfirmed() {
    return this.props.isAccountConfirmed;
  }

  static create(props: SetOptional<UserProps, 'isAccountConfirmed'>, id?: UniqueEntityID) {
    const user = new User({ ...props, isAccountConfirmed: props.isAccountConfirmed ?? false }, id);

    const isNewUser = !id;

    if (isNewUser) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}
