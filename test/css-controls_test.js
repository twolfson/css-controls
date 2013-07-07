var cssControls = require('../lib/css-controls.js'),
    assert = require('./utils/assert'),
    docElt = document.documentElement,
    head = document.getElementsByTagName('head')[0],
    body = document.body;

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
