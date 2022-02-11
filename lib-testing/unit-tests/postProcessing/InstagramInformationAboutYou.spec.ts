import { InformationAboutYou } from '../../../lib/vendors/instagram/InformationAboutYou'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import Assert from 'assert-js'

describe('post process instagram information about you', function () {
  it('should categorise data based on filename', function () {
    postProcessInput.filename = filename
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramInformationAboutYouPostProcess')
  })
  it('should categorise data based on object shape', function () {
    postProcessInput.filename = 'filename'
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramInformationAboutYouPostProcess')
  })
})

const data: InformationAboutYou = {
  primary_location: {
    city_name: 'Exeter, Devon'
  },
  inferred_emails: ['kking506@hotmail.com']
}
const filename = 'information_about_you.json'
const postProcessInput: PostProcessedFileInput<InformationAboutYou> = {
  fileType: 'application/json',

  filename,
  preProcessedOutput: {
    data,
    metadata: { keys: ['primary_location', 'inferred_email'] },
    title: filename
  },
  preProcessingCategory: 'json'
}
