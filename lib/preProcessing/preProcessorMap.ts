import { PreProcessingCategory, PreProcessor } from '../typedefs/PreProcess'
import { jsonPreProcessor } from './preProcessors/json'
import { whatsappPreProcessor } from './preProcessors/whatsapp'
import { csvPreProcessor } from './preProcessors/csv'
import { textPreProcessor } from './preProcessors/text'
import { twitterJsPreProcessor } from './preProcessors/twitterJs'
import { videoPreProcessor } from './preProcessors/video'
import { imagePreProcessor } from './preProcessors/image'
import { htmlPreProcessor } from './preProcessors/html'

export const preProcessorMap: { [key in PreProcessingCategory]: PreProcessor } =
  {
    csv: csvPreProcessor,
    json: jsonPreProcessor,
    text: textPreProcessor,
    whatsapp: whatsappPreProcessor,
    twitterJs: twitterJsPreProcessor,
    image: imagePreProcessor,
    video: videoPreProcessor,
    html: htmlPreProcessor
  }
