import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import { TelegramChatHistory } from '../../../lib/vendors/telegram/JsonChatHistory'
import assert = require('better-assert')
import { postProcessorMap } from '../../../lib/postProcessing/postProcessorMap'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import { arrayEquals } from '../../../lib/common/ArrayUtils'

const fileData: TelegramChatHistory = {
  name: 'My Group',
  type: 'private_group',
  id: 62482526542654,
  messages: [
    {
      id: 77,
      type: 'message',
      date: '2020-10-01T21:44:07',
      from: 'Joe Blogs',
      from_id: 'user29873614',
      text: 'Hello world'
    }
  ]
}
const testData: PostProcessedFileInput<TelegramChatHistory> = {
  filename: 'result.json',
  fileType: 'application/json',
  preProcessedOutput: {
    title: 'result.json',
    metadata: { filename: 'result.json' },
    data: fileData
  }
}
describe('post process telegram messages', function () {
  it('should categorise telegram messages based on object keys', function () {
    const category = postProcessingCategoriser(testData)
    assert(category === 'telegram-messages')
  })

  it('should output the correctly formatted message objects for vaadin message history to display', function () {
    const output = postProcessorMap['telegram-messages'](testData)

    assert(
      output.data.length === testData.preProcessedOutput.data.messages.length
    )

    const message = output.data[0]

    assert(arrayEquals(Object.keys(message), ['time', 'text', 'userName']))

    assert(message.userName === 'Joe Blogs')
    assert(message.text === 'Hello world')
    assert(
      new Date(message.time).toString() ===
        new Date('2020-10-01T21:44:07').toString()
    )
  })
})
