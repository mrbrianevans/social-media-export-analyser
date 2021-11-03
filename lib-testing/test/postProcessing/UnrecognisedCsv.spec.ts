import { PreProcessedOutput } from '../../../lib/typedefs/PreProcess'
import {
  getPostProcessByCode,
  postProcessingCategoriser
} from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert-js'

const data = [
  { qty: 5, id: 1 },
  { qty: 7, id: 2 },
  { qty: 2, id: 3 },
  { qty: 6, id: 4 }
]
const filename = 'file.csv'
const fileType = 'text/csv'
const preProcessedOutput: PreProcessedOutput = {
  data,
  title: filename,
  metadata: {
    length: data.length
  }
}

describe('post process an unrecognised csv file', function () {
  it('should correctly categorise the data as tabular', function () {
    const postProcessingCategory = postProcessingCategoriser({
      filename,
      preProcessingCategory: 'csv',
      fileType,
      preProcessedOutput
    })
    Assert.equal(postProcessingCategory, 'TabularDataPostProcess')
  })

  it('should return correct component name', function () {
    const postProcess = getPostProcessByCode('TabularDataPostProcess')
    Assert.equal(postProcess.component, 'VaadinGrid')
  })

  it('should correctly categorise data as tabular even without csv filename', function () {
    const postProcessingCategory = postProcessingCategoriser({
      filename: 'renamed.extension',
      preProcessingCategory: 'json',
      fileType: 'weird/excel/format',
      preProcessedOutput
    })
    Assert.equal(postProcessingCategory, 'TabularDataPostProcess')
  })
})
