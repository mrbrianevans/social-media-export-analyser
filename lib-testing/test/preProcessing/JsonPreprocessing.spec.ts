import { preProcessorMap } from '../../../lib/preProcessing/preProcessorMap'
import { arrayEquals } from '../../../lib/common/ArrayUtils'
import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'
import assert = require('better-assert')

describe('Pre process JSON text into a javascript object', function () {
  it('should categorise JSON text from file type and extension', function () {
    const category = preProcessingCategoriser({
      filename: 'media.json',
      fileType: 'application/json'
    })
    assert(category === 'json')
  })

  it('should parse a valid JSON string to an Object', function () {
    const jsonString = `
    {
      "name":"social media",
      "vendors": ["whatsapp","telegram"]
    }
    `
    const jsonObject = preProcessorMap['json']({
      fileContent: jsonString,
      fileType: 'application/json',
      filename: 'media.json'
    })
    assert(arrayEquals(Object.keys(jsonObject.data), ['name', 'vendors']))
    assert(jsonObject.data.vendors instanceof Array)
  })
})
