import {
  getPostProcessByCode,
  postProcessingCategoriser
} from '../../../lib/postProcessing/postProcessingCategoriser'
import { TelegramChatHistory } from '../../../lib/vendors/telegram/JsonChatHistory'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import { arrayEquals } from '../../../lib/common/ArrayUtils'
import Assert from 'assert-js'

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
  },
  preProcessingCategory: 'json'
}
describe('post process telegram messages', function () {
  it('should categorise telegram messages with original filename', function () {
    testData.filename = 'result.json'
    const category = postProcessingCategoriser(testData)
    Assert.equal(category, 'TelegramPostProcess')
    const postProcess = getPostProcessByCode(category)
    Assert.equal(postProcess.code, 'telegram-chat')
  })

  it('should categorise telegram messages based on object keys if filename not recognised', function () {
    testData.filename = 'renamed'
    const category = postProcessingCategoriser(testData)
    Assert.equal(category, 'TelegramPostProcess')
    const postProcess = getPostProcessByCode(category)
    Assert.equal(postProcess.code, 'telegram-chat')
  })

  it('should output the correctly formatted message objects for vaadin message history to display', function () {
    const output = getPostProcessByCode(
      'TelegramPostProcess'
    )?.postProcessingFunction(testData)
    Assert.count(testData.preProcessedOutput.data.messages.length, output.data)

    const message = output.data[0]

    // Assert.true(arrayEquals(Object.keys(message), ['time', 'text', 'userName']))
    Assert.hasProperties(['time', 'text', 'userName'], message)
    Assert.equal(message.userName, 'Joe Blogs')
    Assert.equal(message.text, 'Hello world')
    Assert.equal(
      new Date(message.time).toString(),
      new Date('2020-10-01T21:44:07').toString()
    )
  })
})
