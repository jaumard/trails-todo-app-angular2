'use strict'
/* global describe, it */

const assert = require('assert')

describe('Todo Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Todo'])
  })
})
