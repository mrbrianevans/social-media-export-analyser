import { arrayEquals, range } from '../../../../lib/common/ArrayUtils'
import * as Assert from 'assert-js'

describe('generate an array containing numbers in a range', function () {
  it('should generate an array from 1 to 10', function () {
    const output = range(1, 10)
    Assert.true(
      arrayEquals(output, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
      `Generated ${output} instead of 1->10`
    )
  })
  it('should generate an array up to 5', function () {
    const output = range(5)
    Assert.true(
      arrayEquals(output, [0, 1, 2, 3, 4]),
      `Generated ${output} instead of 0->5`
    )
  })
  it('should generate an array up to 10 counting in twos', function () {
    const output = range(0, 10, 2)
    Assert.true(
      arrayEquals(output, [0, 2, 4, 6, 8]),
      `Generated ${output} instead of 0->5`
    )
  })
})
