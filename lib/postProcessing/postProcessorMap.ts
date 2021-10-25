import {
  PostProcessedFileInput,
  PostProcessedOutput,
  PostProcessingCategory,
  PostProcessor
} from '../typedefs/PostProcess'
import { whatsappMessagesPostProcessor } from './postProcessors/whatsappMessages'
import { telegramMessagesPostProcessor } from './postProcessors/telegramMessages'

export const postProcessorMap: {
  [key in PostProcessingCategory]: PostProcessor
} = {
  'instagram-posts'(input: PostProcessedFileInput): PostProcessedOutput {
    return undefined
  },
  'default-array'(input: PostProcessedFileInput): PostProcessedOutput {
    return {
      componentName: 'DataTable',
      data: input.preProcessedOutput.data,
      metadata: input.preProcessedOutput.metadata,
      title: input.preProcessedOutput.title
    }
  },
  'default-object'(input: PostProcessedFileInput): PostProcessedOutput {
    return {
      componentName: 'DataTable',
      data: input.preProcessedOutput.data,
      metadata: input.preProcessedOutput.metadata,
      title: input.preProcessedOutput.title
    }
  },
  'telegram-messages': telegramMessagesPostProcessor,
  'whatsapp-messages': whatsappMessagesPostProcessor
}
