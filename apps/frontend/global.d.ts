import '@total-typescript/ts-reset';
import '@sms/typescript-augments';
import type Resources from './src/shared/i18n/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
