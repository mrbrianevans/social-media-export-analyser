import { PreProcessor } from '../../typedefs/PreProcess'
import {
  convertWhatsappHistoryToVaadinMessages,
  parseWhatsAppChatHistory
} from '../../vendors/whatsapp/ChatHistory'

export const whatsappPreProcessor: PreProcessor = ({
  fileContent,
  filename,
  fileType
}) => {
  const [, recipient] = filename.match(/^WhatsApp Chat with (.*?).txt$/)
  const messages = parseWhatsAppChatHistory(fileContent)
  return {
    data: messages,
    title: `WhatsApp (${recipient})`,
    metadata: { recipient }
  }
}
