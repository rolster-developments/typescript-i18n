import { interpolation } from '@rolster/strings';

import { Language } from './enums';
import {
  I18nDictionary,
  I18nSafeTranslate,
  I18nTranslate,
  I18nValue,
  LanguageCode
} from './types';

let languageCode: LanguageCode = Language.Spanish;

type I18nSubscriber = (language: LanguageCode) => void;

let subscribers: I18nSubscriber[] = [];

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
      (subscriber$) => subscriber !== subscriber$
    );
  };
}

export function i18n<T extends I18nValue = I18nValue>(
  dictionary: I18nDictionary<T>
): I18nTranslate<T> {
  return (key, options) => {
    const collection = dictionary[options?.language || languageCode];

    return collection && collection[key]
      ? interpolation(collection[key], options?.interpolators)
      : '';
  };
}

export function i18nSafe<T extends I18nValue = I18nValue>(
  dictionary: I18nDictionary<T>
): I18nSafeTranslate {
  return (key, options) => {
    const collection = dictionary[options?.language || languageCode];

    return collection && collection[key]
      ? interpolation(collection[key], options?.interpolators)
      : '';
  };
}
