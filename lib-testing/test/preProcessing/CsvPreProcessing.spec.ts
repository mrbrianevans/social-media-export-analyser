import { csvPreProcessor } from '../../../lib/preProcessing/preProcessors/csv'
import { arrayItemsKeysEqual } from '../../utils/keysEqual'
import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'
import assert = require('better-assert')
import Assert = require('assert-js')

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
    Assert.array(jsonArray)
    Assert.count(4, jsonArray)
    for (const row of jsonArray)
      Assert.hasProperties(['id', 'name', 'age'], row)

    const first = jsonArray[0]
    Assert.equal(first.id, 1)
    Assert.equal(first.name, 'Joe Blogs')
    Assert.equal(first.age, 35)
  })

  it('should correctly read a csv string with quotes into an array', function () {
    const csvString = `id,name,age
1,"Joe Blogs",35
2,"Joe Smith",22
3,"Jane Smith",28,
4,"Jane Blogs",32
`
    const output = csvPreProcessor({
      fileContent: csvString,
      fileType: 'text/csv',
      filename: 'data.csv'
    })
    const jsonArray = output.data
    Assert.array(jsonArray)
    Assert.count(4, jsonArray)
    for (const row of jsonArray)
      Assert.hasProperties(['id', 'name', 'age'], row)

    const first = jsonArray[0]
    Assert.equal(first.id, 1)
    Assert.equal(first.name, 'Joe Blogs')
    Assert.equal(first.age, 35)
  })
})
