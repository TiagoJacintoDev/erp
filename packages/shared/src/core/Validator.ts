import { err, ok, Result } from './Result';
import { ValidationError } from '../domain/errors/ValidationError';

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
