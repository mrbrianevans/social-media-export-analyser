import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'
import Assert from 'assert-js'
import { preProcessorMap } from '../../../lib/preProcessing/preProcessorMap'

describe('test the preprocessing and parsing of HTML documents', function () {
  it('should recognise a HTML file by its file extension and mime type', function () {
    const category = preProcessingCategoriser({
      filename: 'index.html',
      fileType: 'text/html',
      filepath: 'index.html'
    })
    Assert.equal(category, 'html')
  })
  it('should return a Cheerio object after preprocessing', function () {
    const fileContent = `<html><body><h1>Hello world</h1></body></html>`
    const out = preProcessorMap['html']({
      fileContent,
      fileType: 'text/html',
      filename: 'index.html'
    })
    Assert.isFunction(out.data.doc) // is a function because of $('div')
    Assert.isFunction(out.data.doc.html) // generates HTML string
    Assert.isFunction(out.data.doc.text) // gets text in HTML
    Assert.isFunction(out.data.doc.root) // gets root element
    Assert.equal(out.data.doc('h1').text(), 'Hello world') // correctly parsed text
  })
})
