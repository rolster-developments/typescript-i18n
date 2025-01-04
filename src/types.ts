import { Interpolators } from '@rolster/strings';

export type LanguageCode = 'en' | 'es' | 'fr' | 'pt';

export type I18nValue = LiteralObject<any>;

export type I18nDictionary<T extends I18nValue = I18nValue> = LiteralObject<T>;

export type I18nParams = I18nValue | string[];

export interface I18nOptions {
  language?: LanguageCode;
  interpolators?: Interpolators;
}

export type I18nLanguage = (language: LanguageCode) => void;

export type I18nTranslate<T extends I18nValue = I18nValue> = (
  key: keyof T,
  options?: I18nOptions
) => string;
