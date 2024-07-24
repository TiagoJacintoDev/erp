import { UniqueEntityID } from './UniqueEntityID';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  protected readonly props: T;

  protected constructor(props: T, id: UniqueEntityID | undefined) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  public equals(entity: Entity<T>): boolean {
    if (this === entity) {
      return true;
    }

    return this._id.equals(entity._id);
  }
}
