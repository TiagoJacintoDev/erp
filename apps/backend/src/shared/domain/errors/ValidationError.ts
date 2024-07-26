import { DomainError } from '../DomainError';

export abstract class ValidationError extends DomainError {
  constructor() {
    super();
  }
}
