import '@total-typescript/ts-reset';
import '@sms/typescript-augments';
import 'jest-extended';
import { type z } from 'zod';
import type Resources from './src/shared/infra/i18n/resources';

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
}
