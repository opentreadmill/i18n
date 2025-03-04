# i18n-module

A simple i18n module for browser-based applications.

## Installation

```sh
npm install github:USERNAME/i18n-module
```

## Usage

translations/en.json
```json
{
    "hello": "Hello World!"
}
```

example-usage.js
```js
import I18n from "i18n-module";

const i18n = new I18n();
i18n.loadLanguage("en").then(() => {
    console.log(i18n.translate("hello"));
});
```

See demo folder for more examples and how to use it.

## Testing

```sh
npm test
```