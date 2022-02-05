import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import Assert from 'assert-js'

describe('post process unrecognised text from any filetype', function () {
  it('should classify arbitrary filename as text due to key from preprocessing', function () {
    const category = postProcessingCategoriser({
      filename: 'renamed',
      fileType: 'xml',
      preProcessingCategory: 'text',
      preProcessedOutput: {
        data: { text: 'I am xml' },
        title: 'text file',
        metadata: {}
      }
    })
    Assert.equal(category, 'TextPostProcess')
  })
})
