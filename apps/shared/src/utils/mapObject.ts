import { fromPairs, toPairs } from 'ramda';
import { type ValueOf } from 'type-fest';

export function mapObject<TOriginal extends object, TKey extends PropertyKey, TValue>(
  obj: TOriginal,
  fn: (key: keyof TOriginal, value: ValueOf<TOriginal>) => [TKey, TValue]
) {
  return fromPairs(toPairs(obj).map(([key, value]) => fn(key, value)));
}
