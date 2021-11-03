import { PostProcess } from '../../../typedefs/PostProcess'

export const TextPostProcess: PostProcess = {
  code: 'text',
  component: 'StringBox',
  classifier: {
    itemCriteria: { keys: ['text'], maxDepth: 1 },
    topLevelIsArray: false,
    filenameRegex: /.*/,
    preProcessingCategory: 'text'
  }
}
