import {
  PostProcessedFileInput,
  PostProcessedOutput,
  PostProcessingCategory,
  PostProcessor
} from '../typedefs/PostProcess'
import { whatsappMessagesPostProcessor } from './postProcessors/messages'

export const postProcessorMap: {
  [key in PostProcessingCategory]: PostProcessor
} = {
  'instagram-posts'(input: PostProcessedFileInput): PostProcessedOutput {
    return undefined
  },
  'default-array'(input: PostProcessedFileInput): PostProcessedOutput {
    return undefined
  },
  'default-object'(input: PostProcessedFileInput): PostProcessedOutput {
    return undefined
  },
  'telegram-messages'(input: PostProcessedFileInput): PostProcessedOutput {
    return undefined
  },
  'whatsapp-messages': whatsappMessagesPostProcessor
}
