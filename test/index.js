var assert = require('assert');

describe('App Module', function () {

    describe('Calc Module', function () {

        it('function sum', function () {
            var calc = require('../app/calc');

            assert.equal(calc.sum([]), 0);
            assert.equal(calc.sum([-1, 0]), -1);
            assert.equal(calc.sum([-1, 1]), 0);
            assert.equal(calc.sum([1, 1, 1]), 3);
            assert.equal(calc.sum([1, 2, -3]), 0);

            assert.equal(calc.sum([-1, Infinity]), Infinity);
            assert.equal(calc.sum([1, -Infinity]), -Infinity);
        });

    });

});
