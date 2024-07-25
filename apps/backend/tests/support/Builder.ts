export abstract class Builder<T> {
  private props: T;
  private readonly randomProps: T;

  protected constructor(props: { default: T; random: T }) {
    this.props = props.default;
    this.randomProps = props.random;
  }

  public overrideProps(override: Partial<T>) {
    this.props = {
      ...this.props,
      ...override,
    };

    return this;
  }

  public chooseRandomProps(keys: (keyof T)[]) {
    for (const key of keys) {
      this.props[key] = this.randomProps[key];
    }

    return this;
  }

  public withRandomProps() {
    this.props = this.randomProps;

    return this;
  }

  public build() {
    return this.props;
  }
}
