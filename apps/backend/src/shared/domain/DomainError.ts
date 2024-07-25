export abstract class DomainError extends Error {
  readonly name: string;
  readonly message: string;

  constructor(message: string) {
    super();
    this.name = this.constructor.name;
    this.message = message;
  }
}
