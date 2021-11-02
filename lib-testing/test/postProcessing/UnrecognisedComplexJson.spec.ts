import { PreProcessedOutput } from '../../../lib/typedefs/PreProcess'
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert-js'

const data = {
  dob: {
    date: '1993-07-20T09:44:18.674Z',
    age: 26
  },
  registered: {
    date: '2002-05-21T10:59:49.966Z',
    age: 17
  },
  phone: '011-962-7516',
  cell: '081-454-0666',
  id: {
    name: 'PPS',
    value: '0390511T'
  },
  picture: {
    large: 'https://randomuser.me/api/portraits/men/75.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg'
  },
  nat: 'IE'
}
const filename = 'randomuser.json'
const fileType = 'application/json'
const preProcessedOutput: PreProcessedOutput = {
  data,
  title: filename,
  metadata: { isArray: false, topLevelKeys: Object.keys(data) }
}

describe('post processing of an unrecognised json file with multiple layers of nesting', function () {
  it('should correctly categorise unrecognised json', function () {
    const postProcessCategory = postProcessingCategoriser({
      preProcessedOutput,
      filename,
      fileType,
      preProcessingCategory: 'json'
    })
    Assert.equal(postProcessCategory, 'NestedKeyValuePostProcess')
  })
})
