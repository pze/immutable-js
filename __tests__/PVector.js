jest.dontMock('../PVector.js');
var PVector = require('../PVector.js').PVector;

describe('PVector', function() {

  it('constructor provides initial values', function() {
    var v = PVector('a', 'b', 'c');
    expect(v.get(0)).toBe('a');
    expect(v.get(1)).toBe('b');
    expect(v.get(2)).toBe('c');
  });

  it('toArray provides a JS array', function() {
    var v = PVector('a', 'b', 'c');
    expect(v.toArray()).toEqual(['a', 'b', 'c']);
  });

  it('fromArray consumes a JS array', function() {
    var v = PVector.fromArray(['a', 'b', 'c']);
    expect(v.toArray()).toEqual(['a', 'b', 'c']);
  });

  it('can set and get a value', function() {
    var v = PVector();
    expect(v.get(0)).toBe(undefined);
    v = v.set(0, 'value');
    expect(v.get(0)).toBe('value');
  });

  it('setting creates a new instance', function() {
    var v0 = PVector('a');
    var v1 = v0.set(0, 'A');
    expect(v0.get(0)).toBe('a');
    expect(v1.get(0)).toBe('A');
  });

  it('length includes the highest index', function() {
    var v0 = PVector();
    var v1 = v0.set(0, 'a');
    var v2 = v1.set(1, 'b');
    var v3 = v2.set(2, 'c');
    expect(v0.length).toBe(0);
    expect(v1.length).toBe(1);
    expect(v2.length).toBe(2);
    expect(v3.length).toBe(3);
  });

  it('get helpers make for easier to read code', function() {
    var v = PVector('a', 'b', 'c');
    expect(v.first()).toBe('a');
    expect(v.get(1)).toBe('b');
    expect(v.last()).toBe('c');
  });

  it('can set at arbitrary indices', function() {
    var v0 = PVector('a', 'b', 'c');
    var v1 = v0.set(1, 'B'); // within existing tail
    var v2 = v1.set(3, 'd'); // at last position
    var v3 = v2.set(31, 'e'); // (testing internal guts)
    var v4 = v3.set(32, 'f'); // (testing internal guts)
    var v5 = v4.set(1023, 'g'); // (testing internal guts)
    var v6 = v5.set(1024, 'h'); // (testing internal guts)
    var v7 = v6.set(32, 'F'); // set within existing tree
    expect(v7.length).toBe(1025);
    var expectedArray = ['a', 'B', 'c', 'd'];
    expectedArray[31] = 'e';
    expectedArray[32] = 'F';
    expectedArray[1023] = 'g';
    expectedArray[1024] = 'h';
    expect(v7.toArray()).toEqual(expectedArray);
  });

  it('exists describes a sparse vector', function() {
    var v = PVector('a', 'b', 'c').push('d').set(10000, 'e').set(64, undefined).remove(1);
    expect(v.length).toBe(10001);
    expect(v.exists(2)).toBe(true); // original end
    expect(v.exists(3)).toBe(true); // end after push
    expect(v.exists(10000)).toBe(true); // end after set
    expect(v.exists(64)).toBe(true); // set as undefined, key still exists
    expect(v.exists(1)).toBe(false); // was removed
    expect(v.exists(10001)).toBe(false); // out of bounds
    expect(v.exists(9999)).toBe(false); // never set
    expect(v.exists(1234)).toBe(false); // never set
    expect(v.exists(4)).toBe(false); // never set
  });

  it('push inserts at highest index', function() {
    var v0 = PVector('a', 'b', 'c');
    var v1 = v0.push('d', 'e', 'f');
    expect(v0.length).toBe(3);
    expect(v1.length).toBe(6);
    expect(v1.toArray()).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('pop removes the highest index, decrementing length', function() {
    var v = PVector('a', 'b', 'c').pop();
    expect(v.last()).toBe('b');
    expect(v.toArray()).toEqual(['a','b']);
    v = v.set(1230, 'x');
    expect(v.length).toBe(1231);
    expect(v.last()).toBe('x');
    v = v.pop();
    expect(v.length).toBe(1230);
    expect(v.last()).toBe(undefined);
    v = v.push('X');
    expect(v.length).toBe(1231);
    expect(v.last()).toBe('X');
  });

  it('allows popping an empty vector', function() {
    v = PVector('a').pop();
    expect(v.length).toBe(0);
    expect(v.toArray()).toEqual([]);
    v = v.pop().pop().pop().pop().pop();
    expect(v.length).toBe(0);
    expect(v.toArray()).toEqual([]);
  });

  it('delete removes an index, but does not affect length', function() {
    var v = PVector('a', 'b', 'c').remove(2).remove(0);
    expect(v.length).toBe(3);
    expect(v.get(0)).toBe(undefined);
    expect(v.get(1)).toBe('b');
    expect(v.get(2)).toBe(undefined);
    // explicit trailing comma. Node consumes the first trailing comma.
    expect(v.toArray()).toEqual([,'b',,]);
    v = v.push('d');
    expect(v.length).toBe(4);
    expect(v.get(3)).toBe('d');
    expect(v.toArray()).toEqual([,'b',,'d']);
  });

  it('shifts values from the front', function() {
    var v = PVector('a', 'b', 'c').shift();
    expect(v.first()).toBe('b');
    expect(v.length).toBe(2);
  });

  it('unshifts values to the front', function() {
    var v = PVector('a', 'b', 'c').unshift('x', 'y', 'z');
    expect(v.first()).toBe('x');
    expect(v.length).toBe(6);
    expect(v.toArray()).toEqual(['x', 'y', 'z', 'a', 'b', 'c']);
  });

});
