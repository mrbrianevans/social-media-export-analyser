import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import * as assert from 'better-assert'
import { postProcessorMap } from '../../../lib/postProcessing/postProcessorMap'
import { arrayEquals } from '../../../lib/common/ArrayUtils'

describe('post process whatsapp json object to vaadin messages format', function () {
  it('should categorise data as whatsapp based on filename', function () {
    const category = postProcessingCategoriser({
      fileType: 'text/plain',
      filename: 'WhatsApp Chat with Joe Blogs.txt',
      preProcessedOutput: {
        data: [],
        title: 'WhatsApp messages with Joe Blogs',
        metadata: {}
      }
    })

    assert(category === 'whatsapp-messages')
  })

  it('should process known valid messages', function () {
    const messages = [
      {
        content: 'hello this is message',
        timestamp: 1348090200000,
        from: 'Jane Blogs'
      },
      {
        content: 'hi I am a message',
        timestamp: 1348089900000,
        from: 'Joe Blogs'
      },
      {
        content:
          'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.',
        timestamp: 1348089720000,
        from: 'system'
      }
    ]
    const output = postProcessorMap['whatsapp-messages']({
      preProcessedOutput: {
        data: messages,
        metadata: {},
        title: 'WhatsApp messages with Joe Blogs'
      },
      fileType: 'text/plain',
      filename: 'WhatsApp Chat with Joe Blogs.txt'
    })

    assert(output.data.length === messages.length)

    const message = output.data[1]

    assert(arrayEquals(Object.keys(message), ['userName', 'time', 'text']))
  })
})
