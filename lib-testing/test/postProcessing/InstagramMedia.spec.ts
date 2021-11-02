import assert = require('better-assert')
import {
  getPostProcessByCode,
  postProcessingCategoriser
} from '../../../lib/postProcessing/postProcessingCategoriser'
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
    assert(category === 'InstagramPostsPostProcess')
    const postProcess = getPostProcessByCode(category)
    assert(postProcess.code === 'instagram-posts')
    assert(postProcess.component === 'InstagramPostsList')
  })
})
