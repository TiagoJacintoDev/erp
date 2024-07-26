export abstract class UseCaseError {
  readonly name: string;

  constructor() {
    this.name = this.constructor.name;
  }
}
