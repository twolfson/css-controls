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
      head.appendChld(this.styleSheet);
    });

    it('adds a <style> tag when appended to the DOM', function () {
      console.log(docElt.innerHTML);
      assert.notEqual(docElt.innerHTML, this.html);
    });

    it('can be found in document.styleSheets', function () {
      assert.strictEqual(document.styleSheets[document.styleSheets.length - 1], this.styleSheet);
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
