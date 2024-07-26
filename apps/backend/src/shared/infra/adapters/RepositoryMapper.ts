import { type Promisable } from 'type-fest';

export abstract class RepositoryMapper<TDomain, TRawModel> {
  protected abstract toDomain(raw: TRawModel): Promisable<TDomain>;
  protected abstract toPersistence(domain: TDomain): Promisable<TRawModel>;
}
