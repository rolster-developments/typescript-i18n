import { interpolation, Interpolators } from '@rolster/helpers-string';

type I18nValue = LiteralObject<string>;

export type I18nDictionary<T extends I18nValue = I18nValue> = LiteralObject<T>;

export type I18nParams = I18nValue | string[];

export interface I18nOptions {
  language?: string;
  interpolators?: Interpolators;
}

export type I18nLanguage = (language: string) => void;

export type I18nTranslate<T extends I18nValue = I18nValue> = (
  key: keyof T,
  options?: I18nOptions
) => string;

let i18nLanguageGlobal = 'es';

type I18nSubscriber = (language: string) => void;

const subscribers: I18nSubscriber[] = [];

/* istanbul ignore next */
export function i18nLanguage(language: string): void {
  i18nLanguageGlobal = language;

  subscribers.forEach((subscriber) => subscriber(language));
}

export function i18nSubscribe(subscriber: I18nSubscriber): void {
  subscribers.push(subscriber);
}

export function i18n<T extends I18nValue = I18nValue>(
  i18nDictionary: I18nDictionary<T>
): I18nTranslate<T> {
  return (() => {
    return (key: keyof T, options?: I18nOptions) => {
      const collection =
        i18nDictionary[options?.language || i18nLanguageGlobal];

      /* istanbul ignore if */
      if (!collection) {
        return '';
      }

      return interpolation(collection[key], options?.interpolators);
    };
  })();
}
