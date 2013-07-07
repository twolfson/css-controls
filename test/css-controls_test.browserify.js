;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var cssControls = require('../lib/css-controls.js'),
    assert = require('./utils/assert'),
    docElt = document.documentElement,
    head = document.getElementsByTagName('head')[0];

describe('css-controls', function () {
  describe('creating a stylesheet', function () {
    before(function () {
      this.styleSheet = cssControls.createStyleSheet();
      this.html = docElt.innerHTML;
    });

    it('can be appended to the DOM', function () {
      head.appendChild(this.styleSheet);
    });

    it('adds a <style> tag when appended to the DOM', function () {
      console.log(docElt.innerHTML);
      assert.notEqual(docElt.innerHTML, this.html);
    });

    it('can be found in document.styleSheets', function () {
      // Iterate over the document style sheets
      var styleSheets = document.styleSheets,
          foundSheet = false,
          i = styleSheets.length;
      while (i--) {
        // If it matches, take note and return
        // DEV: .ownerNode is how we go from CSSStyleSheet to HTMLStyleSheet
        if (document.styleSheets[i].ownerNode === this.styleSheet) {
          foundSheet = true;
          break;
        }
      }
      assert.strictEqual(foundSheet, true);
    });
  });

  describe('adding a CSS rule', function () {
    it('styles relevant elements', function () {

    });

    it('does not style non-relevant elements', function () {

    });
  });

  describe('removing a CSS rule', function () {
    it('removes styles from relevant elements', function () {

    });
  });
});

},{"../lib/css-controls.js":2,"./utils/assert":3}],2:[function(require,module,exports){
// Attribution for majority of information
function createStyleSheet() {
  return document.createElement('style');
}

module.exports = {
  createStyleSheet: createStyleSheet
};
},{}],3:[function(require,module,exports){
// Create and expose assertion methods (node assertion messages suck in browser)
module.exports = {
  strictEqual: function (a, b, msg) {
    if (a !== b) {
      msg = msg || ('Assertion error: ' + a + ' !== ' + b);
      throw new Error(msg);
    }
  },
  notEqual: function (a, b) {
    if (a == b) {
      msg = msg || ('Assertion error: ' + a + ' == ' + b);
      throw new Error(msg);
    }
  }
};

},{}]},{},[1])
;