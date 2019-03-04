/* jshint node: true */
function isPlainObject(input) {
  // https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
  // adapted by Kiril Vatev for use with earlier versions of node
  if (Object.prototype.toString.call(input) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(input);
  return prototype === null || prototype === Object.getPrototypeOf({});
}

function isString(input) {
  return typeof input === 'string';
}

function toArray(value) {
  return [].slice.call(value);
}

function filter(arr, func) {
  return [].filter.call(arr, func);
}

function extend() {
  return Object.assign.apply(Object, [{}].concat(toArray(arguments)));
}

module.exports = {
  isPlainObject: isPlainObject,
  isString: isString,
  toArray: toArray,
  filter: filter,
  extend: extend
};
