export abstract class DomainError extends Error {
  readonly name: string;

  constructor() {
    super();
    this.name = this.constructor.name;
  }
}
