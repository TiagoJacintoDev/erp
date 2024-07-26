import {
  type BaseLocale,
  type BaseTranslation,
  type Locales,
  type Translation,
} from './i18n-types';

type TranslationLocale = Exclude<Locales, BaseLocale>;
type Errors = Translation['errors'];

export type ModuleErrorsTranslation<
  TModule extends keyof Errors,
  TErrors extends keyof Errors[TModule],
> = Record<BaseLocale, BaseTranslation> & Record<TranslationLocale, Errors[TModule][TErrors]>;
