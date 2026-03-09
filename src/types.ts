import { Interpolators } from '@rolster/strings';

export type LanguageCode = 'en' | 'es' | 'fr' | 'pt';

export type I18nValue = LiteralObject<any>;

export type I18nDictionary<T extends I18nValue = I18nValue> = Partial<
  LiteralObject<T, LanguageCode>
>;

export type I18nParams = I18nValue | string[];

export interface I18nOptions {
  language?: LanguageCode;
  interpolators?: Interpolators;
  strict?: boolean;
}

export type I18nLanguage = (language: LanguageCode) => void;

export interface I18nTranslate<T extends I18nValue = I18nValue> {
  (
    key: keyof T,
    options?: Omit<I18nOptions, 'strict'> & { strict?: true }
  ): string;
  (key: string, options?: I18nOptions & { strict: false }): string;
}
