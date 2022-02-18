import { PostProcess, PostProcessor } from '../../typedefs/PostProcess'
import {
  convertWhatsappHistoryToVaadinMessages,
  WhatsAppChatHistoryArray
} from '../../vendors/whatsapp/ChatHistory'
import { VaadinMessageHistoryFormat } from '../../typedefs/Components'
import { getFrequencyTables } from '../../common/FrequencyAnalysis'
import { TimeSeries } from '../../common/TimeSeriesAnalysis'
import { WellKnownMetadata } from '../../typedefs/PreProcess'
import { TopicsMetadata } from '../../common/TopicsMetadata'

export const whatsappMessagesPostProcessor: PostProcessor<
  WhatsAppChatHistoryArray,
  VaadinMessageHistoryFormat
> = (input) => {
  const data = convertWhatsappHistoryToVaadinMessages(
    input.preProcessedOutput.data
  )
  console.time('frequency analysis ' + input.filename)
  const freq = getFrequencyTables(
    data.map((d) => d.text),
    50,
    ['word', 'emoji', 'emoticon']
  )
  console.timeEnd('frequency analysis ' + input.filename)
  console.time('TimeSeries analysis ' + input.filename)
  const ts = new TimeSeries(
    data.map((d) => d.time),
    'WhatsApp messages'
  ).metadata
  console.timeEnd('TimeSeries analysis ' + input.filename)
  console.time('Topics meta analysis ' + input.filename)
  const topics = TopicsMetadata(
    data.map((d) => {
      if (d.text === '<Media omitted>' || d.userName === 'system') d.text = ''
      return d.text
    })
  )
  console.timeEnd('Topics meta analysis ' + input.filename)
  return {
    data,
    metadata: {
      source: 'whatsapp',
      ...input.preProcessedOutput.metadata,
      freq,
      ts,
      topics
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
