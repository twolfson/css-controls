// Load in dependencies
var cssControls = require('../lib/css-controls.js'),
    computedStyle = require('computed-style'),
    assert = require('./utils/assert');

// Localize common elements
var docElt = document.documentElement,
    head = document.getElementsByTagName('head')[0];

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
    it('styles relevant elements', function () {
      // Create and append our test element
      var body = document.body,
          p = document.createElement('p');
      p.className = 'style-me';
      body.appendChild(p);

      // Get the element style and assert
      var fontSize = computedStyle(p, 'font-size');
      assert.strictEqual(fontSize, '50px');

      // Remove the element from the DOM
      body.removeChild(p);
    });

    it('does not style non-relevant elements', function () {
      // Create and append our test element
      var body = document.body,
          p = document.createElement('p');
      body.appendChild(p);

      // Get the element style and assert
      var fontSize = computedStyle(p, 'font-size');
      assert.notEqual(fontSize, '50px');

      // Remove the element from the DOM
      body.removeChild(p);
    });
  });

  describe('removing a CSS rule', function () {
    before(function () {
      cssControls.removeRule(this.styleSheet, this.ruleIndex);
    });
    it('removes styles from relevant elements', function () {
      // Create and append our test element
      var body = document.body,
          p = document.createElement('p');
      p.className = 'style-me';
      body.appendChild(p);

      // Get the element style and assert
      var fontSize = computedStyle(p, 'font-size');
      assert.notEqual(fontSize, '50px');

      // Remove the element from the DOM
      body.removeChild(p);
    });
  });
});
