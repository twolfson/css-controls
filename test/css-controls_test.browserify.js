;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
// Attribution for majority of information http://www.quirksmode.org/dom/w3c_css.html

// Define styleSheet creator
function createStyleSheet() {
  // If we are on IE, use createStyleSheet
  if (document.createStyleSheet) {
    return document.createStyleSheet();
  } else {
  // Otherwise, generate a sheet, append it to the HEAD, and return the CSSStyleElement
    var styleSheet = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(styleSheet);
    // TODO: Not sure if this will be x-browser compatible
    return styleSheet.sheet;
  }
}

// Define rule adder
function addRule(styleSheet, selector, property) {
  // if we are on IE, use addRule
  if (styleSheet.addRule) {
    styleSheet.addRule(selector, property);
    return styleSheet.rules.length - 1;
  } else {
  // Otherwise, generate the rule and append it
    var rule = selector + '{' + property + '}';
    return styleSheet.insertRule(rule, styleSheet.cssRules.length);
  }
}

// Define rule removal
function removeRule(styleSheet, index) {
  // if we are on IE, use removeRule
  if (styleSheet.removeRule) {
    return styleSheet.removeRule(index);
  } else {
  // Otherwise, use deleteRule
    return styleSheet.deleteRule(index);
  }
}

// Export our methods
module.exports = {
  createStyleSheet: createStyleSheet,
  addRule: addRule,
  removeRule: removeRule
};
},{}],2:[function(require,module,exports){
// Create and expose assertion methods (node assertion messages suck in browser)
module.exports = {
  strictEqual: function (a, b, msg) {
    if (a !== b) {
      msg = msg || ('Assertion error: ' + a + ' !== ' + b);
      throw new Error(msg);
    }
  },
  notEqual: function (a, b, msg) {
    if (a == b) {
      msg = msg || ('Assertion error: ' + a + ' == ' + b);
      throw new Error(msg);
    }
  }
};

},{}],3:[function(require,module,exports){
// Load in dependencies
var cssControls = require('../lib/css-controls.js'),
    computedStyle = require('computed-style'),
    assert = require('./utils/assert');

// Localize common elements
var docElt = document.documentElement,
    head = document.getElementsByTagName('head')[0];

// Helper test fns
function fixtureNode(tagName) {
  before(function () {
    // Create and append our test element
    var node = document.createElement(tagName);
    document.body.appendChild(node);
    this.node = node;
  });
  after(function () {
    document.body.removeChild(this.node);
  });
}

// Basic tests
describe('css-controls', function () {
  describe('creating a stylesheet', function () {
    before(function () {
      // Save the page HTML and create our stylesheet
      this.html = docElt.innerHTML;
      this.styleSheet = cssControls.createStyleSheet();
    });

    it('appended <style> a tag to the DOM', function () {
      assert.notEqual(docElt.innerHTML, this.html);
    });

    it('can be found in document.styleSheets', function () {
      // Iterate over the document style sheets
      var styleSheets = document.styleSheets,
          foundSheet = false,
          i = styleSheets.length;
      while (i--) {
        // If it matches, take note and return
        if (styleSheets[i] === this.styleSheet) {
          foundSheet = true;
          break;
        }
      }
      assert.strictEqual(foundSheet, true);
    });
  });

  describe('adding a CSS rule', function () {
    before(function () {
      this.ruleIndex = cssControls.addRule(this.styleSheet, '.style-me', 'font-size: 50px');
    });

    describe('. A relevant element', function () {
      fixtureNode('p');
      before(function () {
        this.node.className = 'style-me';
      });

      it('is styled', function () {
        var fontSize = computedStyle(this.node, 'font-size');
        assert.strictEqual(fontSize, '50px');
      });
    });

    describe('. A non-relevant element', function () {
      fixtureNode('p');

      it('is not styled', function () {
        var fontSize = computedStyle(this.node, 'font-size');
        assert.notEqual(fontSize, '50px');
      });
    });
  });

  describe('removing a CSS rule', function () {
    before(function () {
      cssControls.removeRule(this.styleSheet, this.ruleIndex);
    });

    describe('. A formerly relevant element', function () {
      fixtureNode('p');
      before(function () {
        this.node.className = 'style-me';
      });

      it('is not styled', function () {
        var fontSize = computedStyle(this.node, 'font-size');
        assert.notEqual(fontSize, '50px');
      });
    });
  });
});

},{"../lib/css-controls.js":1,"./utils/assert":2,"computed-style":4}],4:[function(require,module,exports){
// This code has been refactored for 140 bytes
// You can see the original here: https://github.com/twolfson/computedStyle/blob/04cd1da2e30fa45844f95f5cb1ac898e9b9ef050/lib/computedStyle.js
var computedStyle = function (el, prop, getComputedStyle) {
  getComputedStyle = window.getComputedStyle;

  // In one fell swoop
  return (
    // If we have getComputedStyle
    getComputedStyle ?
      // Query it
      // TODO: From CSS-Query notes, we might need (node, null) for FF
      getComputedStyle(el) :

    // Otherwise, we are in IE and use currentStyle
      el.currentStyle
  )[
    // Switch to camelCase for CSSOM
    // DEV: Grabbed from jQuery
    // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
    // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
    prop.replace(/-(\w)/gi, function (word, letter) {
      return letter.toUpperCase()
    })
  ]
}

module.exports = computedStyle;
},{}]},{},[3])
;