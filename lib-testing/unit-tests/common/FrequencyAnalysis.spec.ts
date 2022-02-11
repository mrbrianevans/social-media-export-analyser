import { getFrequencyTables } from '../../../lib/common/FrequencyAnalysis'
import Assert from 'assert-js'

describe('test frequency analysis of words in text', function () {
  it('should get word frequency table for strings of text', function () {
    const ft = getFrequencyTables(
      [
        'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
        'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.'
      ],
      null,
      ['word']
    )
    Assert.hasProperties(['word'], ft)
    Assert.hasProperties(['wife', 'truth', 'fortune'], ft.word)
    Assert.equal(ft.word.wife, 1)
    Assert.equal(ft.word.fortune, 1)
    Assert.equal(ft.word.truth, 2)
  })
  it('should get emoji frequency table with correct counts', function () {
    const ft = getFrequencyTables(['😀😁😂🤣', '😀😀😀', '😁😁'], null, [
      'emoji'
    ])
    Assert.hasProperties(['emoji'], ft)
    Assert.hasProperties(['😀', '😁', '😂', '🤣'], ft.emoji)
    Assert.equal(ft.emoji['😀'], 4)
    Assert.equal(ft.emoji['😁'], 3)
    Assert.equal(ft.emoji['😂'], 1)
    Assert.equal(ft.emoji['🤣'], 1)
    console.log(getFrequencyTables(['Hello', 'world!'], null, ['word']))
  })
})
