import { PreProcessingCategory, PreProcessor } from '../typedefs/PreProcess'
import { jsonPreProcessor } from './preProcessors/json'
import { whatsappPreProcessor } from './preProcessors/whatsapp'
import { csvPreProcessor } from './preProcessors/csv'
import { textPreProcessor } from './preProcessors/text'
import { twitterJsPreProcessor } from './preProcessors/twitterJs'

export const preProcessorMap: { [key in PreProcessingCategory]: PreProcessor } =
  {
    csv: csvPreProcessor,
    json: jsonPreProcessor,
    text: textPreProcessor,
    whatsapp: whatsappPreProcessor,
    twitterJs: twitterJsPreProcessor
  }
