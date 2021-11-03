import {
  getPostProcessByCode,
  postProcessingCategoriser
} from '../../../lib/postProcessing/postProcessingCategoriser'
import { Media } from '../../../lib/vendors/instagram/Media'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import * as Assert from 'assert-js'

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
  it('should categorise instagram media file correctly with original filename', function () {
    testData.filename = 'media.json'
    const category = postProcessingCategoriser(testData)
    Assert.equal(category, 'InstagramPostsPostProcess')
  })

  it('should categorise instagram media file correctly when file is renamed', function () {
    testData.filename = 'renamedfile'
    const category = postProcessingCategoriser(testData)
    Assert.equal(category, 'InstagramPostsPostProcess')
  })

  it('should use the right component to display instagram posts', function () {
    const postProcess = getPostProcessByCode('InstagramPostsPostProcess')
    Assert.equal(postProcess.code, 'instagram-posts')
    Assert.equal(postProcess.component, 'InstagramPostsList')
  })
})
