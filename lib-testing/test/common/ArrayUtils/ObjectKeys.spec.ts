import {
  keysInclude,
  objectKeysEqual,
  objectKeysInclude
} from '../../../../lib/common/ArrayUtils'
import * as Assert from 'assert-js'

describe('check the keys of an object equals an array', function () {
  it('should return true when an objects keys equal an array', function () {
    const keys = ['profile', 'stories', 'videos', 'photos']
    const object = { profile: [], stories: [], videos: [], photos: [] }
    const output = objectKeysEqual(object, keys)
    Assert.true(output)
  })
  it('should return true when an objects keys equal an array in a different order', function () {
    const keys = ['stories', 'photos', 'profile', 'videos']
    const object = { profile: [], stories: [], videos: [], photos: [] }
    const output = objectKeysEqual(object, keys)
    Assert.true(output)
  })
  it(`should return false when an objects keys don't include all items in an array`, function () {
    const keys = ['profile', 'stories', 'videos', 'photos', 'moments']
    const object = { profile: [], stories: [], videos: [], photos: [] }
    const output = objectKeysEqual(object, keys)
    Assert.false(output)
  })
  it(`should return false when the object has more keys than whats in the array`, function () {
    const keys = ['profile', 'stories', 'videos', 'photos']
    const object = {
      profile: [],
      stories: [],
      videos: [],
      photos: [],
      moments: []
    }
    const output = objectKeysEqual(object, keys)
    Assert.false(output)
  })
  it(`should check only the top level keys of a nested object`, function () {
    const keys = ['profile', 'stories', 'videos', 'photos']
    const object = {
      profile: ['account'],
      stories: [{ date: new Date(2020, 10, 21) }],
      videos: [1, 2, 3],
      photos: [[[{ day: 18 }]]]
    }
    const output = objectKeysEqual(object, keys)
    Assert.true(output)
  })
})

describe('object keys include array', function () {
  it('should return true if an objects keys include items in an array', function () {
    const keys = ['date_joined', 'email']
    const object = {
      date_joined: '2021-06-10T11:16:49',
      date_of_birth: '2006-11-18',
      email: 'karrobinson411@gmail.com',
      gender: 'female'
    }
    const output = objectKeysInclude(object, keys)

    Assert.true(output)
  })
  it(`should return false if an objects keys don't include items in an array`, function () {
    const keys = ['date_joined', 'email']
    const object = {
      date_joined: '2021-06-10T11:16:49',
      date_of_birth: '2006-11-18',
      gender: 'female'
    }
    const output = objectKeysInclude(object, keys)

    Assert.false(output)
  })
})

describe('check if an object or an array of objects items include certain keys', function () {
  it('should return true when an array has items which include all the keys', function () {
    const keys = ['gender', 'year']
    const object = [
      { gender: 'female', year: 2006 },
      { gender: 'female', year: 2006 },
      { gender: 'female', year: 2006 }
    ]
    const output = keysInclude(object, keys)

    Assert.true(output)
  })
  it('should return true when an object includes all the keys', function () {
    const keys = ['gender', 'year']
    const object = { gender: 'female', year: 2006 }
    const output = keysInclude(object, keys)

    Assert.true(output)
  })

  it(`should return false when an array has items which don't include all the keys`, function () {
    const keys = ['gender', 'year']
    const object = [
      { gender: 'female', year: 2006 },
      { gender: 'female', year: 2006 },
      { gender: 'female' }
    ]
    const output = keysInclude(object, keys)

    Assert.false(output)
  })
  it(`should return false when an object doesn't includes all the keys`, function () {
    const keys = ['gender', 'year']
    const object = { gender: 'female' }
    const output = keysInclude(object, keys)

    Assert.false(output)
  })
})
