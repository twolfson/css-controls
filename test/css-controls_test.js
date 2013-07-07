var cssControls = require('../lib/css-controls.js'),
    assert = require('./utils/assert'),
    docElt = document.documentElement,
    head = document.getElementsByTagName('head')[0],
    body = document.body;

describe('css-controls', function () {
  describe('creating a stylesheet', function () {
    before(function () {
      // Create a stylesheet and save the HTML of the page
      this.styleSheet = cssControls.createStyleSheet();
      this.html = docElt.innerHTML;
    });

    it('can be appended to the DOM', function () {
      head.appendChild(this.styleSheet);
    });

    it('adds a <style> tag when appended to the DOM', function () {
      assert.notEqual(docElt.innerHTML, this.html);
    });

    // TODO: Skipping this for now as it will be proven out by CSS rule tests
    it.skip('can be found in document.styleSheets', function () {
      // Iterate over the document style sheets
      var styleSheets = document.styleSheets,
          foundSheet = false,
          i = styleSheets.length;
      while (i--) {
        // If it matches, take note and return
        // DEV: .ownerNode is how we go from CSSStyleSheet to HTMLStyleSheet
        if (styleSheets[i].ownerNode === this.styleSheet) {
          foundSheet = true;
          break;
        }
      }
      assert.strictEqual(foundSheet, true);
    });
  });

  describe('adding a CSS rule', function () {
    before(function () {
      cssControls.addRule(this.styleSheet, '.style-me', 'font-size: 50px');
    });
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
