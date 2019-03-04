/* jshint node: true, mocha: true */

var expect = require('chai').expect;

var lib = require('../');

describe('[env]', function() {
  describe('when called with no arguments', function () {
    it('returns a copy of process.env', function () {
      var newEnv = lib();

      // make sure they are different objects
      expect(newEnv).not.to.equal(process.env);
      expect(newEnv).to.deep.equal(process.env);
    });
  });

  describe('when called with one object', function () {
    it('extends process.env with the provided object', function() {
      var keys = Object.keys(process.env);
      var testKey = 'unicorn_llama';
      keys.push(testKey);

      var testEnv = {};
      testEnv[testKey] = 1;

      var newEnv = lib(testEnv);

      expect(newEnv).to.have.all.keys(keys);
      expect(newEnv).to.have.property(testKey).and.to.equal(testEnv[testKey].toString());
    });

    it('extends process.env with multiple provided objects', function() {
      var keys = Object.keys(process.env);
      keys.push('unicorn');
      keys.push('fruit');

      var newEnv = lib({
          unicorn: 'tea'
      }, {
          unicorn: 'pizza'
      }, {
          fruit: 'pineapples'
      });

      expect(newEnv).to.have.all.keys(keys);

      expect(newEnv).to.have.property('unicorn').and.to.equal('pizza');
      expect(newEnv).to.have.property('fruit').and.to.equal('pineapples');
    });

    it('does not modify the actual process.env', function() {
      var testKey = 'unicorn_llama';

      var testEnv = {};
      testEnv[testKey] = 1;

      var newEnv = lib(testEnv);

      expect(process.env).to.not.have.property(testKey);
      expect(newEnv).to.have.property(testKey).and.to.equal(testEnv[testKey].toString());
    });
  });


});
