import { objectSize } from '../../../../lib/common/ArrayUtils'
import * as Assert from 'assert'

describe('calculate the size of an object in number of primitives', function () {
  it('should get the size of a simple object', function () {
    const obj = {
      action: 'delete',
      date: new Date().getTime()
    }
    const output = objectSize(obj)
    Assert.equal(output, 2)
  })
  it('should get the size of an object with 5 primitives', function () {
    const obj = {
      action: 'delete',
      date: { year: 2020, month: 10 },
      permission: true,
      role: 'Admin'
    }
    const output = objectSize(obj)
    Assert.equal(output, 5)
  })
  it('should get the size of an object with 6 primitives including null', function () {
    const obj = {
      action: 'delete',
      date: { year: 2020, month: 10 },
      permission: true,
      role: 'Admin',
      violation: null
    }
    const output = objectSize(obj)
    Assert.equal(output, 6)
  })
  it('should get the size of an object with 6 primitives in an array', function () {
    const obj = {
      actions: ['create', 'delete', 'update', 'replace', 'rename', 'edit']
    }
    const output = objectSize(obj)
    Assert.equal(output, 6)
  })
})
