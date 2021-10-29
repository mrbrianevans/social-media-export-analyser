import { PreProcessingCategory, PreProcessor } from '../typedefs/PreProcess'
import { jsonPreProcessor } from './preProcessors/json'
import { whatsappPreProcessor } from './preProcessors/whatsapp'
import { csvPreProcessor } from './preProcessors/csv'
import { textPreProcessor } from './preProcessors/text'

export const preProcessorMap: { [key in PreProcessingCategory]: PreProcessor } =
  {
    csv: csvPreProcessor,
    json: jsonPreProcessor,
    text: textPreProcessor,
    whatsapp: whatsappPreProcessor
  }
