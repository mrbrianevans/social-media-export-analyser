import { generateTwitterTweetFile } from '../../../../lib/vendors/twitter/Tweets'
import { processFileContent } from '../../../../lib/processFileContent'
import * as Assert from 'assert-js'

describe('process twitter files from beginning to end', function () {
  it('should process a tweet file', function () {
    const fileContent = generateTwitterTweetFile({ qty: 5 })
    const output = processFileContent({
      fileContent,
      filename: 'tweet.js',
      fileType: ''
    })
    Assert.equal(output.data.length, 5)
  })
})
