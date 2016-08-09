var test = require('ava')
var resl = require('../lib')

test('regl is a function', (t) => {
  t.is(typeof resl, 'function')
})
