import { PreProcessedOutput } from '../../../lib/typedefs/PreProcess'
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'

const data = {}
const filename = 'connections.json',
  fileType = 'application/json'
const preProcessedOutput: PreProcessedOutput = {
  data,
  metadata: { keys: [] },
  title: filename
}
describe('post processing instagram connections', function () {
  it('should categorise instagram connections based on filename', function () {
    postProcessingCategoriser({
      preProcessingCategory: 'json',
      preProcessedOutput,
      filename,
      fileType
    })
  })
})
