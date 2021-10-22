import { PreProcessingCategory, PreProcessor } from '../typedefs/PreProcess'
import { jsonPreProcessor } from './preProcessors/json'
import { whatsappPreProcessor } from './preProcessors/whatsapp'

export const preProcessorMap: { [key in PreProcessingCategory]: PreProcessor } =
  {
    csv: jsonPreProcessor,
    json: jsonPreProcessor,
    text: jsonPreProcessor,
    whatsapp: whatsappPreProcessor
  }
