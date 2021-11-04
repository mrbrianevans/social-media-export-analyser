import { PreProcessedOutput } from '../../../lib/typedefs/PreProcess'
import {
  getPostProcessByCode,
  postProcessingCategoriser
} from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert-js'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import { InstagramConnections } from '../../../lib/vendors/instagram/Connections'

const data: InstagramConnections = {
  followers: { username1: '2021-09-30T00:46:35-01:00' }
}
const filename = 'connections.json',
  fileType = 'application/json'
const preProcessedOutput: PreProcessedOutput<InstagramConnections> = {
  data,
  metadata: { keys: [] },
  title: filename
}
const postProcessInput: PostProcessedFileInput<InstagramConnections> = {
  preProcessingCategory: 'json',
  preProcessedOutput,
  filename,
  fileType
}
describe('post processing instagram connections', function () {
  it('should categorise instagram connections based on filename', function () {
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramConnectionsPostProcess')
  })

  it('should reformat dates in post processing', function () {
    const postProcess = getPostProcessByCode('InstagramConnectionsPostProcess')
    const output = postProcess.postProcessingFunction(postProcessInput)
    Assert.equal(Object.keys(output.data).length, 1)
    Assert.equal(Object.keys(output.data)[0], 'followers')
    Assert.equal(Object.keys(output.data.followers).length, 1)
    Assert.equal(Object.keys(output.data.followers)[0], 'username1')
    // tests the date formatting:
    Assert.true(
      (<string>Object.values(output.data.followers)[0]).startsWith('September')
    )
  })
})
