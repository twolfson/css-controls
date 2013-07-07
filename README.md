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

[npm]: http://npmjs.org/
[bower]: http://bower.io/
[component]: http://component.io/
[download]: https://raw.github.com/twolfson/css-controls/master/dist/css-controls.js

For `npm` and `component`, you can load it in as follows:
```javascript
var cssControls = require('css-controls');
```

For `bower` and `http`, you can use vanilla JS
```html
<script src="components/css-controls.js"></script>
window.cssControls; // `css-controls` is defined on `window` in camelCase
```

or you can use [AMD][amd]

[amd]: http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition

```js
require(['css-controls'], funtion (cssControls) { /* code */ });
```

or [CommonJS][commonjs] syntax (see `npm`/`component` section).

[commonjs]: http://wiki.commonjs.org/wiki/Modules/1.0

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
cssControls.createStyleSheet();
/**
 * Create and append stylesheet to DOM
 * @returns {CSSStyleElement} Created stylesheet
 */
```

```js
cssControls.addRule(styleSheet, selector, property);
/**
 * Add a CSS rule to a stylesheet
 * @param {CSSStyleElement} styleSheet Stylesheet to add rule to
 * @param {String} selector CSS selector (e.g. `.nav > .nav-bar`)
 * @param {String} property CSS property to apply to `selector` (e.g. `background: blue`)
 * @returns {Number} Index the rule was inserted at
 */
```

```js
cssControls.removeRule(styleSheet, index);
/**
 * Remove a CSS rule from a stylesheet
 * @param {CSSStyleElement} styleSheet Stylesheet to remove rule from
 * @param {Numer} index Index of the rule to remove
 */
```

A large amount of the background knowledge came from [quirksmode][quirksmode].

[quirksmode]: http://www.quirksmode.org/dom/w3c_css.html

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
