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
labels. The default language is Spanish (`'es'`); change it globally with
`i18nLanguage` or per call with the `language` option.

```ts
import { i18n } from '@rolster/i18n';

const dictionary = {
  es: { hello: 'Hola, {{name}}' },
  en: { hello: 'Hi, {{name}}' }
};

const translate = i18n(dictionary);

translate('hello', { interpolators: { name: 'Rolster' } }); // 'Hola, Rolster'
translate('hello', { language: 'en', interpolators: { name: 'Rolster' } }); // 'Hi, Rolster'
```

### `i18n` (strict)

The key is typed as `keyof T`, so passing a key that is not declared in the
dictionary is a **compile-time** error. Use it when the dictionary is known
ahead of time and you want the compiler to guarantee every label exists.

```ts
const translate = i18n(dictionary);

translate('hello'); // ✅ ok
translate('goodbye'); // ❌ compile-time error: key does not exist in the dictionary
```

### `i18nSafe` (lenient)

Accepts any `string` key and returns `''` at runtime when the key (or the
language collection) is missing. Use it when keys are dynamic or not known at
compile time.

```ts
import { i18nSafe } from '@rolster/i18n';

const translate = i18nSafe(dictionary);

translate('hello'); // ✅ ok
translate('goodbye'); // ✅ ok, returns '' (no error)
```

## Changing the language

```ts
import { i18nLanguage, i18nSubscribe } from '@rolster/i18n';

const unsubscribe = i18nSubscribe((language) => {
  console.log(`Language changed to ${language}`);
});

i18nLanguage('en'); // sets the global language and notifies subscribers

unsubscribe();
```

## Contributing

- Daniel Andrés Castillo Pedroza :rocket:
