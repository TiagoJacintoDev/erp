import '@total-typescript/ts-reset';
import 'jest-extended';
import { type z } from 'zod';
import type Resources from './src/shared/infra/i18n/resources';
import { SetParameterType } from 'type-fest';
import { TFunction as DefaultTFunction } from 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}

type ValidatorRequest = {
  parseBody: <T>(schema: z.ZodType<T>) => T;
};

declare global {
  namespace Express {
    interface Request extends ValidatorRequest {}
  }

  type Nil = null | undefined;
  type Falsy = false | 0 | '' | null | undefined | 0n;

  interface BooleanConstructor {
    <T>(value: T): value is T extends Falsy ? never : T;
  }
}
