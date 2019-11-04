import test from 'ava'

import example from './index'

test('should export a function', (t) => {
  t.is(typeof example, 'function')
})
