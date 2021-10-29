import { postProcessorMap } from '../../../lib/postProcessing/postProcessorMap'
import assert = require('better-assert')
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import { Media } from '../../../lib/vendors/instagram/Media'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'

const testData: PostProcessedFileInput<Media> = {
  filename: 'media.json',
  fileType: 'application/json',
  preProcessedOutput: {
    data: {
      photos: [],
      profile: [],
      stories: [],
      videos: []
    },
    title: 'Instagram posts',
    metadata: {}
  },
  preProcessingCategory: 'json'
}

describe('post process instagram media.json file of posts', function () {
  it('should categorise instagram media file correctly', function () {
    const category = postProcessingCategoriser(testData)
    assert(category === 'instagram-posts')
  })

  it('should return the correct component', function () {
    const output = postProcessorMap['instagram-posts'](testData)
    assert(output.componentName === 'InstagramPostsList')
  })
})
