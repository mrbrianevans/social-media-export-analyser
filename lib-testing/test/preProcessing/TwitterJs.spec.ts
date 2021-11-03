import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'
import * as Assert from 'assert-js'
import { preProcessorMap } from '../../../lib/preProcessing/preProcessorMap'

describe('twitter js files preprocessing', function () {
  it('should parse a twitter js file into a javascript object', function () {
    const category = preProcessingCategoriser({
      fileType: '',
      filename: 'tweet.js'
    })
    Assert.equal(category, 'twitterJs')
  })

  it('should parse twitter tweet file contents into json object', function () {
    const output = preProcessorMap['twitterJs']({
      filename: 'tweet.js',
      fileType: '',
      fileContent: sampleTweetsFile
    })
    Assert.equal(output.data.length, 1)
    Assert.equal(output.data[0].created_at, 'Sun Oct 17 13:17:07 -0100 2021')
    Assert.equal(output.data[0].display_text_range?.[1], '59')
  })
})

const sampleTweetsFile = `

  window.YTD.tweet.part0 = [
  {
    "created_at": "Sun Oct 17 13:17:07 -0100 2021",
    "display_text_range": [
      "0",
      "59"
    ],
    "entities": {
      "hashtags": [],
      "symbols": [],
      "urls": [],
      "user_mentions": []
    },
    "favorite_count": "3",
    "favorited": false,
    "full_text": "Detail day little today today detail day like detail post🎈",
    "id": "464518516",
    "id_str": "464518516",
    "lang": "en",
    "retweet_count": "2",
    "retweeted": false,
    "source": "<a href=\\"http://twitter.com/download/iphone\\" rel=\\"nofollow\\">Twitter for iPhone</a>",
    "truncated": false
  }
]
  
`
