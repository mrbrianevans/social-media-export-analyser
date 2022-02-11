import { PostProcess, PostProcessor } from '../../typedefs/PostProcess'
import {
  convertWhatsappHistoryToVaadinMessages,
  WhatsAppChatHistoryArray
} from '../../vendors/whatsapp/ChatHistory'
import { VaadinMessageHistoryFormat } from '../../typedefs/Components'
import { getFrequencyTables } from '../../common/FrequencyAnalysis'
import { TimeSeries } from '../../common/TimeSeriesAnalysis'

export const whatsappMessagesPostProcessor: PostProcessor<
  WhatsAppChatHistoryArray,
  VaadinMessageHistoryFormat
> = (input) => {
  const data = convertWhatsappHistoryToVaadinMessages(
    input.preProcessedOutput.data
  ).slice(0, 1_000_000)
  const freq = getFrequencyTables(
    data.map((d) => d.text),
    50,
    ['word', 'emoji', 'emoticon']
  )
  const ts = new TimeSeries(
    data.map((d) => d.time),
    'WhatsApp messages'
  ).metadata
  return {
    data,
    metadata: {
      source: 'whatsapp',
      ...input.preProcessedOutput.metadata,
      freq,
      ts
    },
    title:
      'WhatsApp messages with ' + input.preProcessedOutput.metadata.recipient
  }
}

export const WhatsAppPostProcess: PostProcess = {
  name: 'WhatsApp chat',
  code: 'whatsapp-chat',
  nameFormat: 'WhatsApp chat with {}',
  classifier: {
    filenameRegex: /WhatsApp Chat with .*/,
    fileTypes: ['text/plain'],
    preProcessingCategory: 'whatsapp',
    topLevelIsArray: true,
    itemCriteria: { keys: ['content', 'timestamp', 'from'] }
  },
  vendor: 'WhatsApp',
  postProcessingFunction: whatsappMessagesPostProcessor,
  component: 'MessageHistory'
}
