var test = require('ava')
var resl = require('../index')

test('regl is a function', (t) => {
  t.is(typeof resl, 'function')
})
