import { csvPreProcessor } from '../../../lib/preProcessing/preProcessors/csv'
import assert = require('better-assert')
import { arrayItemsKeysEqual } from '../../utils/keysEqual'
import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'

describe('pre process CSV file contents into javascript objects', function () {
  it('should categorise a csv file based on filename and type', function () {
    let category = preProcessingCategoriser({
      filename: 'data.csv',
      fileType: 'text/csv'
    })
    assert(category === 'csv')

    category = preProcessingCategoriser({
      filename: 'data.csv',
      fileType: 'application/vnd.ms-excel'
    })
    assert(category === 'csv')
  })

  it('should correctly read a simple csv string into an array', function () {
    const csvString = `id,name,age
1,Joe Blogs,35
2,Joe Smith,22
3,Jane Smith,28,
4,Jane Blogs,32
`
    const output = csvPreProcessor({
      fileContent: csvString,
      fileType: 'text/csv',
      filename: 'data.csv'
    })
    const jsonArray = output.data

    assert(jsonArray.length === 4)

    assert(arrayItemsKeysEqual(jsonArray, ['id', 'name', 'age']))

    const first = jsonArray[0]

    assert(first.id === '1')
    assert(first.name === 'Joe Blogs')
    assert(first.age === '35')
  })
})
