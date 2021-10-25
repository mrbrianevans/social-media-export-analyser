import { PostProcessor } from '../../typedefs/PostProcess'
import {
  convertWhatsappHistoryToVaadinMessages,
  WhatsAppChatHistoryArray
} from '../../vendors/whatsapp/ChatHistory'
import { VaadinMessageHistoryFormat } from '../../typedefs/Components'

export const whatsappMessagesPostProcessor: PostProcessor<
  WhatsAppChatHistoryArray,
  VaadinMessageHistoryFormat
> = (input) => {
  return {
    data: convertWhatsappHistoryToVaadinMessages(
      input.preProcessedOutput.data
    ).slice(0, 100),
    metadata: {
      source: 'whatsapp',
      ...input.preProcessedOutput.metadata
    },
    title:
      'WhatsApp messages with ' + input.preProcessedOutput.metadata.recipient,
    componentName: 'MessageHistory'
  }
}
