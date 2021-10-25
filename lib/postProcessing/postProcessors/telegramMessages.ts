import { PostProcessor } from '../../typedefs/PostProcess'
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
    title: 'Telegram messages with ' + input.preProcessedOutput.data.name,
    componentName: 'MessageHistory'
  }
}
