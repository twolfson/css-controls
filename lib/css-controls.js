// Attribution for majority of information http://www.quirksmode.org/dom/w3c_css.html

/**
 * Create and append stylesheet to DOM
 * @returns {CSSStyleElement} Created stylesheet
 */
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

/**
 * Add a CSS rule to a stylesheet
 * @param {CSSStyleElement} styleSheet Stylesheet to add rule to
 * @param {String} selector CSS selector (e.g. `.nav > .nav-bar`)
 * @param {String} property CSS property to apply to `selector` (e.g. `background: blue`)
 * @returns {Number} Index the rule was inserted at
 */
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

/**
 * Remove a CSS rule from a stylesheet
 * @param {CSSStyleElement} styleSheet Stylesheet to remove rule from
 * @param {Numer} index Index of the rule to remove
 */
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