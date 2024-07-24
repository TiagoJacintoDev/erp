export class Identifier<T> {
  protected constructor(private readonly value: T) {
    this.value = value;
  }

  equals(id: Identifier<T>): boolean {
    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  toValue(): T {
    return this.value;
  }
}
