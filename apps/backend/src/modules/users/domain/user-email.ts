import { err, ok, type Result } from '../../../shared/core/Result';
import { ValidationError } from '../../../shared/domain/errors/ValidationError';
import { ValueObject } from '../../../shared/domain/ValueObject';

type UserEmailProps = {
  value: string;
};

class InvalidEmailError extends ValidationError {
  constructor(public readonly email: string) {
    super();
  }
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value() {
    return this.props.value;
  }

  static create(email: string): Result<UserEmail, ValidationError> {
    const isValidEmailResult = this.isValidEmail(email);

    return isValidEmailResult.isOk()
      ? ok(new UserEmail({ value: this.format(email) }))
      : err(isValidEmailResult.error);
  }

  private static isValidEmail(email: string): Result<true, InvalidEmailError> {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email) ? ok(true) : err(new InvalidEmailError(email));
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
