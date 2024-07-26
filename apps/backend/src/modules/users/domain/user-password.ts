import { Validator } from '@sms/shared/src/core/Validator';
import { type SetOptional } from 'type-fest';

import { err, ok, type Result } from '../../../shared/core/Result';
import { type ValidationError } from '../../../shared/domain/errors/ValidationError';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { type PasswordHasher } from '../services/hasher/passwordHasher.service';

type UserPasswordProps = {
  value: string;
  hashed: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  private static readonly minLength = 6;

  get value() {
    return this.props.value;
  }

  public async compare(raw: string, hasher: PasswordHasher) {
    return this.isAlreadyHashed() ? await hasher.compare(raw, this.value) : raw === this.value;
  }

  public async getHashed(hasher: PasswordHasher) {
    return this.isAlreadyHashed() ? this.value : await hasher.hash(this.value);
  }

  public isAlreadyHashed() {
    return this.props.hashed;
  }

  static create(
    props: SetOptional<UserPasswordProps, 'hashed'>,
  ): Result<UserPassword, ValidationError> {
    if (!props.hashed) {
      const isAtLeastLengthResult = Validator.isAtLeastLength(this.minLength, props.value);

      if (isAtLeastLengthResult.isErr()) return err(isAtLeastLengthResult.error);
    }

    return ok(new UserPassword({ ...props, hashed: props.hashed ?? false }));
  }
}
