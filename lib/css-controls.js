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