var path = require('path');

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

function filter(arr, func) {
  return [].filter.call(arr, func);
}

function extendToString(target) {
  var args = [].slice.call(arguments, 1);

  function extend(to, from) {
    for (var i in from) {
      to[i] = from[i].toString();
    }

    return to;
  }

  args.forEach(extend.bind(null, target));

  return target;
}

function mergePaths() {
  var mergedPath = [].slice.call(arguments).reduce(function(memo, arg) {
    var p = arg.PATH || arg.Path || arg.path;

    if (!(isString(p) && p.length)) {
        return memo;
    }

    p = p.trim().replace(new RegExp(path.delimiter + '$'), '');

    return memo.concat(p.split(path.delimiter));
  }, []).join(path.delimiter);

  // because Windows, we need to overwrite all 3
  return {
    PATH: mergedPath
  };
}

function newEnv() {
  return extendToString.apply(
    null,
    [Object.assign({}, process.env)].concat(filter(arguments, isPlainObject))
  );
}

module.exports = function () {
  var env = newEnv.apply(null, arguments, mergePaths.apply(null, [process.env].concat(arguments)));

  delete env.Path;
  delete env.path;

  return env;
};
