import {
  CommonAudioTypes,
  CommonImageTypes,
  CommonVideoTypes,
  isMedia
} from '../../../lib/common/isMedia'
import * as Assert from 'assert-js'

describe('test the function which determines if a file is media', function () {
  it('should return true for common image formats', function () {
    for (const imageType of CommonImageTypes) {
      Assert.true(isMedia(`image/${imageType}`))
    }
  })

  it('should return true for common video only formats', function () {
    for (const imageType of CommonVideoTypes) {
      Assert.true(isMedia(`video/${imageType}`))
    }
  })
  it('should return true for common audio only formats', function () {
    for (const imageType of CommonAudioTypes) {
      Assert.true(isMedia(`audio/${imageType}`))
    }
  })

  it('should return false for pdf, json or text', function () {
    Assert.false(isMedia('application/pdf'))
    Assert.false(isMedia('application/json'))
    Assert.false(isMedia('text/plain'))
  })
})
