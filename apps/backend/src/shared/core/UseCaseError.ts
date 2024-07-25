export abstract class UseCaseError extends Error {
  readonly message: string;
  readonly name: string;

  constructor(message: string) {
    super();
    this.name = this.constructor.name;
    this.message = message;
  }
}
