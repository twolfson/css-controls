# css-controls [![Donate on Gittip](http://badgr.co/gittip/twolfson.png)](https://www.gittip.com/twolfson/)

Cross-browser stylesheet creation and css rule creation/deletion (includes IE6 support).

This was created to be a well-tested cross-browser library for basic CSS stylesheet and rule creaton/deletion.

[![browser support](https://ci.testling.com/twolfson/css-controls.png)](https://ci.testling.com/twolfson/css-controls)

## Getting Started
`css-controls` is available via the following:

- [npm][npm], `npm install css-controls`
- [bower][bower], `bower install css-controls`
- [component][component], `component install css-controls`
- [Download via HTTP][download]

[npm]:
[bower]:
[component]:
[download]:

For `npm` and `component`, you can load it in as follows:
```javascript
var cssControls = require('css-controls');
cssControls
```

For `bower` and `http`, you can use vanilla JS
```html
<script src="components/css-controls.js"></script>
```

or you can use [AMD][amd]

[amd]:

```js
require(['css-controls'], funtion (cssControls) { /* code */ });
```

or [CommonJS][commonjs] syntax (see `npm`/`component` section).

[commonjs]:

Once you have the module loaded, you can create new style sheets and add/remove CSS rules.

```javascript
// Create a stylesheet (auto-appended to DOM)
var sheet = cssControls.createStyleSheet();

// Color all `p` tags red (ruleIndex = index rule was created at)
var ruleIndex = cssControls.addRule(sheet, 'p', 'color: red');

// Color the `body` green
cssControls.addRule(sheet, 'body', 'background: #BADA55');

// Remove the first rule
cssControls.removeRule(ruleIndex); // Equivalent to cssControls.removeRule(sheet, 0);
```

## Documentation
`css-controls` returns 3 cross-browser functions.

```js

```

A large amount of the background knowledge came from [quirksmode][quirksmode].

[quirksmode]:

## Examples
`css-controls` can be used with `document.styleSheets` as these are `CSSStyleElements`

```
// Color the `body` via the first stylesheet
var sheet = document.styleSheets[0];
cssControls.addRule(sheet, 'body', 'background: papayawhip');
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
