import { PostProcessor } from '../../typedefs/PostProcess'
import {
  convertWhatsappHistoryToVaadinMessages,
  WhatsAppChatHistoryArray
} from '../../vendors/whatsapp/ChatHistory'

export const whatsappMessagesPostProcessor: PostProcessor = (input) => {
  return {
    data: convertWhatsappHistoryToVaadinMessages(
      <WhatsAppChatHistoryArray>input.preProcessedOutput.data
    ).slice(0, 100),
    metadata: {
      source: 'whatsapp'
    },
    title:
      'WhatsApp messages with ' + input.preProcessedOutput.metadata.recipient,
    componentName: 'MessageHistory'
  }
}
