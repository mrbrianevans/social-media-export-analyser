import {
  PostProcessedFileInput,
  PostProcessedOutput,
  PostProcessingCategory,
  PostProcessor
} from '../typedefs/PostProcess'
import { whatsappMessagesPostProcessor } from './postProcessors/whatsappMessages'
import { telegramMessagesPostProcessor } from './postProcessors/telegramMessages'
import { ComponentName } from '../typedefs/Components'

export const postProcessorMap: {
  [key in PostProcessingCategory]: PostProcessor
} = {
  'instagram-posts'(input: PostProcessedFileInput): PostProcessedOutput {
    return {
      componentName: 'InstagramPostsList',
      data: input.preProcessedOutput.data,
      metadata: input.preProcessedOutput.metadata,
      title: 'Instagram posts'
    }
  },
  'default-array'(input: PostProcessedFileInput): PostProcessedOutput {
    return {
      componentName: 'VaadinGrid',
      data: input.preProcessedOutput.data,
      metadata: input.preProcessedOutput.metadata,
      title: input.preProcessedOutput.title
    }
  },
  'default-object'(input: PostProcessedFileInput): PostProcessedOutput {
    const d = input.preProcessedOutput.data
    let longestArray = []
    if (Object.keys(d).length < 5) {
      for (const key in d) {
        if (d[key] instanceof Array && d[key].length > longestArray.length) {
          longestArray = d[key]
        }
      }
    }
    let data = longestArray.length ? longestArray : d
    let componentName: ComponentName = longestArray.length
      ? 'VaadinGrid'
      : 'JsonEditor'
    return {
      componentName,
      data,
      metadata: input.preProcessedOutput.metadata,
      title: input.preProcessedOutput.title
    }
  },
  'telegram-messages': telegramMessagesPostProcessor,
  'whatsapp-messages': whatsappMessagesPostProcessor
}
