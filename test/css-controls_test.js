// Load in dependencies
var cssControls = require('../dist/css-controls.js'),
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
