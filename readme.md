# Rolster i18n

Utility lightweight simple translation.

## Installation

```
npm i @rolster/i18n
```

## Configuration

You must install the `@rolster/types` to define package data types, which are configured by adding them to the `files` property of the `tsconfig.json` file.

```json
{
  "files": ["node_modules/@rolster/types/index.d.ts"]
}
```

## Usage

A dictionary maps each `LanguageCode` (`'en' | 'es' | 'fr' | 'pt'`) to a set of
labels. The `Language` enum exposes the same codes as named members
(`Language.English`, `Language.Spanish`, `Language.French`,
`Language.Portuguese`); both the enum members and the plain string codes are
accepted wherever a `LanguageCode` is expected. The default language is Spanish
(`Language.Spanish`); change it globally with `i18nLanguage` or per call with
the `language` option.

Labels are interpolated with
[`@rolster/strings`](https://www.npmjs.com/package/@rolster/strings):
placeholders use **single** braces, either named (`{name}`) and resolved from an
object, or positional (`{0}`, `{1}`) and resolved from an array.

```ts
import { i18n, Language } from '@rolster/i18n';

const dictionary = {
  es: { hello: 'Hola, {name}', bye: 'Adiós', winners: 'Ganaron {0} y {1}' },
  en: { hello: 'Hi, {name}', bye: 'Bye', winners: '{0} and {1} won' }
};

const translate = i18n(dictionary);

translate('hello', { interpolators: { name: 'Rolster' } }); // 'Hola, Rolster'
translate('hello', {
  language: Language.English,
  interpolators: { name: 'Rolster' }
}); // 'Hi, Rolster'
translate('winners', { language: 'en', interpolators: ['Bale', 'Modric'] }); // 'Bale and Modric won'
```

### `i18n` (strict)

The key is typed as `keyof T`, so passing a key that is not declared in the
dictionary is a **compile-time** error. Use it when the dictionary is known
ahead of time and you want the compiler to guarantee every label exists.

At runtime it returns `''` when the language collection is missing, and also
when the label contains placeholders but no `interpolators` are given.

```ts
const translate = i18n(dictionary);

translate('bye'); // 'Adiós'
translate('hello'); // '' — the label has a placeholder and no interpolators were given
translate('hello', { interpolators: { name: 'Rolster' } }); // 'Hola, Rolster'
translate('goodbye'); // ❌ compile-time error: key does not exist in the dictionary
```

### `i18nSafe` (lenient)

Accepts any `string` key and returns `''` at runtime when the key (or the
language collection) is missing. Use it when keys are dynamic or not known at
compile time.

```ts
import { i18nSafe } from '@rolster/i18n';

const translate = i18nSafe(dictionary);

translate('bye'); // 'Adiós'
translate('goodbye'); // ✅ ok, returns '' (no error)
```

## Changing the language

```ts
import { i18nLanguage, i18nSubscribe, Language } from '@rolster/i18n';

const unsubscribe = i18nSubscribe((language) => {
  console.log(`Language changed to ${language}`);
});

i18nLanguage(Language.English); // sets the global language and notifies subscribers
i18nLanguage('es'); // plain codes are accepted as well

unsubscribe();
```

The subscriber is a plain `(language: LanguageCode) => void` callback;
`i18nSubscribe` returns an `Unsubscription` (`() => void`) that removes it.

## Types

| Type                | Description                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LanguageCode`      | `'en' \| 'es' \| 'fr' \| 'pt'` — accepted language codes.                                                                                                      |
| `Language`          | Enum with `English = 'en'`, `French = 'fr'`, `Portuguese = 'pt'`, `Spanish = 'es'`.                                                                            |
| `I18nValue`         | `LiteralObject<any>` — the set of labels of one language.                                                                                                      |
| `I18nDictionary<T>` | `Partial<Record<LanguageCode, T>>` — labels per language code.                                                                                                 |
| `I18nOptions`       | `{ interpolators?: Interpolators; language?: LanguageCode }` — per-call options. `Interpolators` (from `@rolster/strings`) is an object or a positional array. |
| `I18nTranslate<T>`  | `(key: keyof T, options?: I18nOptions) => string` — function returned by `i18n`.                                                                               |
| `I18nSafeTranslate` | `(key: string, options?: I18nOptions) => string` — function returned by `i18nSafe`.                                                                            |
| `I18nParams`        | `I18nValue \| string[]` — an object or positional array of interpolation values.                                                                               |
| `I18nLanguage`      | `(language: LanguageCode) => void` — signature of `i18nLanguage` and of the `i18nSubscribe` callback.                                                          |

## Contributing

- Daniel Andrés Castillo Pedroza :rocket:
