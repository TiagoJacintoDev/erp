import { ValueObject } from '../../../shared/domain/ValueObject';

type UserPasswordProps = {
  value: string;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  static create(props: UserPasswordProps) {
    return new UserPassword(props);
  }
}
