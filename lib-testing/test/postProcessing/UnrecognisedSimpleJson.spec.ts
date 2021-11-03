import { PreProcessedOutput } from '../../../lib/typedefs/PreProcess'
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert-js'

const data = {
  uuid: '155e77ee-ba6d-486f-95ce-0e0c0fb4b919',
  username: 'silverswan131',
  password: 'firewall',
  salt: 'TQA1Gz7x',
  md5: 'dc523cb313b63dfe5be2140b0c05b3bc',
  sha1: '7a4aa07d1bedcc6bcf4b7f8856643492c191540d',
  sha256: '74364e96174afa7d17ee52dd2c9c7a4651fe1254f471a78bda0190135dcd3480',
  street: '9278 new road',
  city: 'kilcoole',
  state: 'waterford',
  postcode: '93027',
  seed: 'fea8be3e64777240',
  results: 1,
  page: 1,
  version: '1.3'
}
const filename = 'randomuser.json'
const fileType = 'application/json'
const preProcessedOutput: PreProcessedOutput = {
  data,
  title: filename,
  metadata: { isArray: false, topLevelKeys: Object.keys(data) }
}

describe('post processing of an unrecognised json file', function () {
  it('should correctly categorise unrecognised json', function () {
    const postProcessCategory = postProcessingCategoriser({
      preProcessedOutput,
      filename,
      fileType,
      preProcessingCategory: 'json'
    })
    Assert.equal(postProcessCategory, 'KeyValuePostProcess')
  })
  it('should correctly categorise unrecognised json without filename or filetype', function () {
    const postProcessCategory = postProcessingCategoriser({
      preProcessedOutput,
      filename: 'renamed',
      fileType: 'unknown',
      preProcessingCategory: 'text'
    })
    Assert.equal(postProcessCategory, 'KeyValuePostProcess')
  })
})
