import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'
import * as assert from 'better-assert'
import { preProcessorMap } from '../../../lib/preProcessing/preProcessorMap'
import { arrayEquals } from '../../../lib/common/ArrayUtils'

describe('pre process whatsapp text file into object', function () {
  it('should categorise correctly as whatsapp based on filename', function () {
    const category = preProcessingCategoriser({
      fileType: 'text/plain',
      filename: 'WhatsApp Chat with Joe Blogs.txt'
    })

    assert(category === 'whatsapp')
  })

  it('should convert txt to json object', function () {
    const messagesTxt = `9/19/12, 10:22 PM - Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.
9/19/12, 10:25 PM - Joe Blogs: hi I am a message
9/19/12, 10:30 PM - Jane Blogs: hello this is message`

    const json = preProcessorMap['whatsapp']({
      fileContent: messagesTxt,
      fileType: 'text/plain',
      filename: 'WhatsApp Chat with Joe Blogs.txt'
    })

    assert(typeof json.data === 'object')
    assert(json.data instanceof Array)
    assert(json.data.length === 3)

    const message = json.data[1]

    assert(arrayEquals(Object.keys(message), ['from', 'content', 'timestamp']))
    assert(message.from === 'Joe Blogs')
    assert(message.content === 'hi I am a message')
    assert(message.timestamp === new Date('9/19/12, 10:25 PM').getTime())
  })
})
