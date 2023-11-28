export type I18nObject = LiteralObject<LiteralObject<string>>;

type I18nOptions = LiteralObject<string> | string[];

type I18nTranslate = (key: string, options?: I18nOptions) => string;

let i18nLanguaje = 'es';

export function setLanguage(language: string): void {
  i18nLanguaje = language;
}

export function i18n(i18nObject: I18nObject, language?: string): I18nTranslate {
  return (() => {
    return (key: string, options?: I18nOptions) => {
      const collection = i18nObject[language || i18nLanguaje];

      const result = collection[key];

      if (result && options) {
        return result.replace(
          /{([^{}]*)}/g,
          (_, key) =>
            (Array.isArray(options) ? options[+key] : options[key]) || ''
        );
      }

      return result;
    };
  })();
}
