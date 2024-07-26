import '@total-typescript/ts-reset';
import 'jest-extended';
import { Locales, type TranslationFunctions } from './src/shared/infra/i18n/i18n-types';

type I18NextRequest = {
  language: Locales;
  languages: Locales[];
  t: TranslationFunctions;
};

declare global {
  namespace Express {
    interface Request extends I18NextRequest {}
  }
}
