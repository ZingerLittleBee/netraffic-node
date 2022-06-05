import test from 'ava'

import { getDefaultDevice, getDevice } from '../index.js'

test('getDevice', t => {
    t.not(getDefaultDevice(), '')
})

test('getDefaultDevice', t => {
    t.assert(getDevice().length > 0)
})
