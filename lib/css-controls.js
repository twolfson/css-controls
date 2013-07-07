// Attribution for majority of information http://www.quirksmode.org/dom/w3c_css.html

// Define styleSheet creator
function createStyleSheet() {
  return document.createElement('style');
}

// Define rule adder
function addRule(styleSheet, selector, property) {
  return styleSheet.addRule(selector, property);
}

module.exports = {
  createStyleSheet: createStyleSheet,
  addRule: addRule
};