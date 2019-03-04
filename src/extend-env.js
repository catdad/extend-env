/* jshint node: true */
var path = require('path');
var utils = require('./utils.js');

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
  var mergedPath = [].reduce.call(arguments, function(memo, arg) {
    var p = arg.PATH || arg.Path || arg.path;

    if (!(utils.isString(p) && p.length)) {
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
    [utils.extend(process.env)].concat(utils.filter(arguments, utils.isPlainObject))
  );
}

module.exports = function thing () {
  var args = utils.toArray(arguments);
  var mergedPathEnv = mergePaths.apply(null, [process.env].concat(args));
  var env = newEnv.apply(null, args.concat(mergedPathEnv));

  delete env.Path;
  delete env.path;

  return env;
};
