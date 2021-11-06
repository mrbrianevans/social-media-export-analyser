import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert-js'

describe('post process instagram comments', function () {
  it('should categorise instagram comments based on filename', function () {
    postProcessedInput.filename = 'comments.json'
    const output = postProcessingCategoriser(postProcessedInput)

    Assert.equal(output, 'InstagramCommentsPostProcess')
  })

  it('should categorise instagram comments for renamed file based on keys and depth', function () {
    postProcessedInput.filename = 'renamed'
    const output = postProcessingCategoriser(postProcessedInput)

    Assert.equal(output, 'InstagramCommentsPostProcess')
  })
})

const postProcessedInput: PostProcessedFileInput = {
  filename: 'comments.json',
  fileType: 'application/json',
  preProcessingCategory: 'json',
  preProcessedOutput: {
    title: 'comments.json',
    metadata: {},
    data: {
      media_comments: [
        ['2010-10-26T18:37:41+00:00', 'comment content', 'username1']
      ]
    }
  }
}
