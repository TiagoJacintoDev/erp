/// <reference path="nil.d.ts" />
/// <reference path="falsy.d.ts" />

interface BooleanConstructor {
  <T>(value: T): value is T extends Falsy ? never : T;
}
