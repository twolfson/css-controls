(function(e){if("function"==typeof bootstrap)bootstrap("css-controls",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeCssControls=e}else"undefined"!=typeof window?window.cssControls=e():global.cssControls=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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
},{}]},{},[1])(1)
});
;