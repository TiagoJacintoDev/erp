import '@total-typescript/ts-reset';
import '@sms/typescript-augments/src/recommended';
import 'jest-extended';
import { type z } from 'zod';

declare module 'i18next' {
  interface CustomTypeOptions {}
}

type ValidatorRequest = {
  parseBody: <T>(schema: z.ZodType<T>) => T;
};

declare global {
  namespace Express {
    interface Request extends ValidatorRequest {}
  }
}
