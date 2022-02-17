import { PostProcess, PostProcessor } from '../../typedefs/PostProcess'
import {
  convertWhatsappHistoryToVaadinMessages,
  WhatsAppChatHistoryArray
} from '../../vendors/whatsapp/ChatHistory'
import { VaadinMessageHistoryFormat } from '../../typedefs/Components'
import { getFrequencyTables } from '../../common/FrequencyAnalysis'
import { TimeSeries } from '../../common/TimeSeriesAnalysis'
import { WellKnownMetadata } from '../../typedefs/PreProcess'

import winkNLP from 'wink-nlp'
import model from 'wink-eng-lite-web-model'

const nlp = winkNLP(model)
const { its, as } = nlp

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
  const optionalMetadata: WellKnownMetadata = {}
  if (data.length > 10 && data.length < 500) {
    optionalMetadata.topics = {
      documents: Array.from(
        new Set(
          data.map((d) => nlp.readDoc(d.text).tokens().out(its.lemma).join(' '))
        )
      ),
      options: {
        numberOfTopics: Math.ceil(5),
        docsMinTopicRank: 0.7,
        topicsMinWordRank: 0.04
      }
    }
  }
  return {
    data,
    metadata: {
      source: 'whatsapp',
      ...input.preProcessedOutput.metadata,
      freq,
      ts,
      ...optionalMetadata
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
