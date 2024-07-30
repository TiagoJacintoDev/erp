import '@total-typescript/ts-reset';
import 'jest-extended';
import { Locales, type TranslationFunctions } from './src/shared/infra/i18n/i18n-types';
import { z } from 'zod';

type I18NextRequest = {
  language: Locales;
  languages: Locales[];
  t: TranslationFunctions;
};

type ValidatorRequest = {
  parseBody: <T>(schema: z.ZodType<T>) => T;
};

type CustomRequest = I18NextRequest & ValidatorRequest;

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}
