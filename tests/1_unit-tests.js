const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', function () {
  suite('Basic Assertions', function () {
    // #1 - isNull, isNotNull
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'null is null');
      assert.isNotNull(1, '1 is not null');
    });

    // #2 - isDefined, isUndefined
    test('#isDefined, #isUndefined', function () {
      assert.isDefined(null, 'null is not undefined');
      assert.isUndefined(undefined, 'undefined IS undefined');
      assert.isDefined('hello', 'A string is not undefined');
    });

    // #3 - isOk, isNotOk (truthy/falsey)
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'null is falsey');
      assert.isOk("I'm truthy", 'A string is truthy');
      assert.isOk(true, 'true is truthy');
    });

    // #4 - isTrue, isNotTrue
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'true is true');
      assert.isTrue(!!'double negation', 'Double negation of a truthy is true');
      assert.isNotTrue({ value: 'truthy' }, 'Objects are truthy but not true');
    });
  });

  suite('Equality', function () {
    // #5 - equal, notEqual (==)
    test('#equal, #notEqual', function () {
      assert.equal(12, '12', 'Numbers are coerced into strings with ==');
      assert.notEqual({ value: 1 }, { value: 1 }, '== compares object references');
      assert.equal(6 * '2', '12', '6 * "2" == "12"');
      assert.equal(6 + '2', '12', '6 + "2" == "12"');
    });

    // #6 - strictEqual, notStrictEqual (===)
    test('#strictEqual, #notStrictEqual', function () {
      assert.notStrictEqual(6, '6', '6 !== "6" (types differ)');
      assert.strictEqual(6, 3 * 2, '6 === 3 * 2');
      assert.strictEqual(6 * '2', 12, '6 * "2" === 12');
      assert.notStrictEqual([1, 'a', {}], [1, 'a', {}], 'Arrays are different objects');
    });

    // #7 - deepEqual, notDeepEqual
    test('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, "Key order doesn't matter");
      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, 'Array order matters');
    });
  });

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite('Comparisons', function () {
    // #8 - isAbove, isAtMost
    test('#isAbove, #isAtMost', function () {
      assert.isAtMost('hello'.length, 5, 'length <= 5');
      assert.isAbove(1, 0, '1 > 0');
      assert.isAbove(Math.PI, 3, 'PI > 3');
      assert.isAtMost(1 - Math.random(), 1, '1 - random <= 1');
    });

    // #9 - isBelow, isAtLeast
    test('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5, 'length >= 5');
      assert.isAtLeast(2 * Math.random(), 0, 'random >= 0');
      assert.isBelow(5 % 2, 2, '5 % 2 < 2');
      assert.isBelow(2 / 3, 1, '2/3 < 1');
    });

    // #10 - approximately
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5, '0.5 <= weirdNumber <= 1.5');
      assert.approximately(weirdNumbers(0.2), 1, 0.8, '0.2 <= weirdNumber <= 1.8');
    });
  });

  const winterMonths = ['dec', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];

  suite('Arrays', function () {
    // #11 - isArray, isNotArray
    test('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split(''), 'split() returns an array');
      assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });

    // #12 - include, notInclude
    test('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul', "jul isn't a winter month");
      assert.include(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };

  suite('Strings', function () {
    // #13 - isString, isNotString
    test('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4), 'Math.sin() returns a number');
      assert.isString(process.env.PATH || '', 'PATH is a string');
      assert.isString(JSON.stringify({ type: 'object' }), 'JSON is a string');
    });

    // #14 - include, notInclude (strings)
    test('String #include, #notInclude', function () {
      assert.include('Arrow', 'row', '"Arrow" contains "row"');
      assert.notInclude('dart', 'queue', '"dart" doesn\'t contain "queue"');
    });

    // #15 - match, notMatch (regex)
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople('John Doe', 35), regex, 'Valid format');
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex, 'Invalid age');
    });
  });

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16 - property, notProperty
    test('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings', 'Cars don\'t have wings');
      assert.property(airlinePlane, 'engines', 'Planes have engines');
      assert.property(myCar, 'wheels', 'Cars have wheels');
    });

    // #17 - typeOf, notTypeOf
    test('#typeOf, #notTypeOf', function () {
      assert.typeOf(myCar, 'object', 'Car is an object');
      assert.typeOf(myCar.model, 'string', 'model is a string');
      assert.notTypeOf(airlinePlane.wings, 'string', 'wings are numbers');
      assert.typeOf(airlinePlane.engines, 'array', 'engines is an array');
      assert.typeOf(myCar.wheels, 'number', 'wheels are numbers');
    });

    // #18 - instanceOf, notInstanceOf
    test('#instanceOf, #notInstanceOf', function () {
      assert.notInstanceOf(myCar, Plane, 'Car is not a Plane');
      assert.instanceOf(airlinePlane, Plane, 'Plane is a Plane');
      assert.instanceOf(airlinePlane, Object, 'Plane is also an Object');
      assert.notInstanceOf(myCar.wheels, String, 'wheels are numbers, not strings');
    });
  });
});
