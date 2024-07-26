import { err, ok, Result } from 'backend/src/shared/core/Result';
import { ValidationError } from 'backend/src/shared/domain/errors/ValidationError';

class IsLessThanMinLengthError extends ValidationError {
  constructor(public readonly min: number) {
    super();
  }
}

export class Validator {
  static isAtLeastLength(min: number, text: string): Result<true, IsLessThanMinLengthError> {
    return text.length >= min ? ok(true) : err(new IsLessThanMinLengthError(min));
  }
}
