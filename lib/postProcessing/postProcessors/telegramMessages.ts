import { PostProcess, PostProcessor } from '../../typedefs/PostProcess'
import {
  convertTelegramJsonChatHistoryToVaadinMessages,
  TelegramChatHistory
} from '../../vendors/telegram/JsonChatHistory'
import { VaadinMessageHistoryFormat } from '../../typedefs/Components'
import { getFrequencyTables } from '../../common/FrequencyAnalysis'
import { TimeSeries } from '../../common/TimeSeriesAnalysis'
import { TopicsMetadata } from '../../common/TopicsMetadata'

export const telegramMessagesPostProcessor: PostProcessor<
  TelegramChatHistory,
  VaadinMessageHistoryFormat
> = (input) => {
  const data = convertTelegramJsonChatHistoryToVaadinMessages(
    <TelegramChatHistory>input.preProcessedOutput.data
  ).slice(0, 1_000_000)
  const freq = getFrequencyTables(
    data.map((d) => d.text),
    50,
    ['word', 'emoji', 'emoticon']
  )
  const ts = new TimeSeries(
    data.map((d) => d.time),
    'Telegram messages'
  ).metadata
  const topics = TopicsMetadata(
    data.map((d) => {
      return d.text
    })
  )
  return {
    data,
    metadata: {
      source: 'telegram',
      recipient: input.preProcessedOutput.data.name,
      chat_type: input.preProcessedOutput.data.type,
      ...input.preProcessedOutput.metadata,
      freq,
      ts,
      topics
    },
    title: 'Telegram messages with ' + input.preProcessedOutput.data.name
  }
}

export const TelegramPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^result\.json$/,
    fileTypes: ['application/json'],
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    itemCriteria: { keys: ['name', 'type', 'id', 'messages'] }
  },
  component: 'MessageHistory',
  name: 'Telegram Chat',
  code: 'telegram-chat',
  nameFormat: 'Telegram chat with {}',
  postProcessingFunction: telegramMessagesPostProcessor,
  vendor: 'Telegram'
}
