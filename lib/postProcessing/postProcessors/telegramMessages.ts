import { PostProcess, PostProcessor } from '../../typedefs/PostProcess'
import {
  convertTelegramJsonChatHistoryToVaadinMessages,
  TelegramChatHistory
} from '../../vendors/telegram/JsonChatHistory'
import { VaadinMessageHistoryFormat } from '../../typedefs/Components'

export const telegramMessagesPostProcessor: PostProcessor<
  TelegramChatHistory,
  VaadinMessageHistoryFormat
> = (input) => {
  return {
    data: convertTelegramJsonChatHistoryToVaadinMessages(
      <TelegramChatHistory>input.preProcessedOutput.data
    ).slice(0, 100),
    metadata: {
      source: 'telegram',
      recipient: input.preProcessedOutput.data.name,
      chat_type: input.preProcessedOutput.data.type,
      ...input.preProcessedOutput.metadata
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
