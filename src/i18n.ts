import { interpolation } from '@rolster/strings';
import {
  I18nDictionary,
  I18nOptions,
  I18nTranslate,
  I18nValue,
  LanguageCode
} from './types';
import { Language } from './enums';

let languageCode: LanguageCode = Language.Spanish;

type I18nSubscriber = (language: LanguageCode) => void;

let subscribers: I18nSubscriber[] = [];

/* istanbul ignore next */
export function i18nLanguage(language: LanguageCode): void {
  languageCode = language;

  subscribers.forEach((subscriber) => {
    subscriber(language);
  });
}

export function i18nSubscribe(subscriber: I18nSubscriber): Unsubscription {
  subscribers.push(subscriber);

  return () => {
    subscribers = subscribers.filter(
      (_subscriber) => subscriber !== _subscriber
    );
  };
}

export function i18n<T extends I18nValue = I18nValue>(
  dictionary: I18nDictionary<T>
): I18nTranslate<T> {
  return (() => {
    return (key: keyof T, options?: I18nOptions) => {
      const collection = dictionary[options?.language || languageCode];

      return collection && collection[key]
        ? interpolation(collection[key], options?.interpolators)
        : '';
    };
  })();
}
