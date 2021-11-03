import {
  objectDepth,
  objectOrArrayDepth
} from '../../../../lib/common/ArrayUtils'
import * as Assert from 'assert-js'

describe('Calculate the depth of an object', function () {
  it('should find the object depth correctly for a singly deeply nested object', function () {
    const obj = {
      account: {
        details: {
          name: {
            firstName: {
              initial: 'S',
              content: 'Sam'
            }
          }
        }
      }
    }

    const depth = objectDepth(obj)

    Assert.equal(depth, 5)
  })

  it('should find the object depth for a multiple deeply nested object', function () {
    const obj = {
      name: {
        firstName: 'Sam',
        lastName: 'Jones'
      },
      loggedIn: false,
      lastLogin: {
        location: {
          coordinates: {
            lat: 0.56541651651,
            long: 62.195651681237
          }
        }
      }
    }

    const depth = objectDepth(obj)

    Assert.equal(depth, 4)
  })

  it('should get correct depth for key value pairs', function () {
    const obj = {
      key1: 'value1',
      key2: 'value2'
    }
    const depth = objectDepth(obj)

    Assert.equal(depth, 1)
  })
  it('should get correct depth for two layered key value pairs', function () {
    const obj = {
      set1: {
        key1: 'value1',
        key2: 'value2'
      },
      set2: {
        key1: 'value1',
        key2: 'value2'
      }
    }
    const depth = objectDepth(obj)

    Assert.equal(depth, 2)
  })
  it('should get correct depth for three layered key value pairs', function () {
    const obj = {
      tld: {
        set1: {
          key1: 'value1',
          key2: 'value2'
        },
        set2: {
          key1: 'value1',
          key2: 'value2'
        }
      }
    }
    const depth = objectDepth(obj)

    Assert.equal(depth, 3)
  })
  it('should get correct depth for four layered key value pairs', function () {
    const obj = {
      name: {
        firstName: 'Sam',
        lastName: 'Jones'
      },
      tld: {
        set1: {
          key1: {
            complex: 'value1'
          },
          key2: 'value2'
        },
        set2: {
          key1: 'value1',
          key2: 'value2'
        }
      }
    }
    const depth = objectDepth(obj)

    Assert.equal(depth, 4)
  })
  it('should get correct depth for five layered key value pairs', function () {
    const obj = {
      tld: {
        set1: {
          key1: {
            complex: {
              setOf: 'values'
            }
          },
          key2: 'value2',
          key3: 'value3',
          key4: 'value4'
        },
        set2: {
          key1: 'value1',
          key2: 'value2'
        },
        set3: {
          key1: 'value1',
          key2: 'value2'
        },
        set4: {
          key1: 'value1',
          key2: 'value2'
        }
      },
      tld1: '.com',
      tld2: '.co.uk'
    }
    const depth = objectDepth(obj)

    Assert.equal(depth, 5)
  })
})

describe('object or array depth', function () {
  it('should get the right depth for the items of an array', function () {
    const obj = [
      {
        set4: {
          key1: 'value1',
          key2: 'value2'
        }
      },
      {
        set3: {
          key1: 'value1',
          key2: 'value2'
        }
      },
      {
        set2: {
          key1: 'value1',
          key2: 'value2'
        }
      }
    ]
    const depth = objectOrArrayDepth(obj)
    Assert.equal(depth, 2)
  })

  it('should get the correct depth for an object', function () {
    const obj = {
      set4: {
        key1: 'value1',
        key2: 'value2'
      }
    }
    const depth = objectOrArrayDepth(obj)
    Assert.equal(depth, 2)
  })
})
