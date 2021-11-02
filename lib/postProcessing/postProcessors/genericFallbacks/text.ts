import { PostProcess } from '../../../typedefs/PostProcess'

export const TextPostProcess: PostProcess = {
  code: 'text',
  component: 'StringBox',
  classifier: {
    itemCriteria: { keys: ['text'] },
    topLevelIsArray: false,
    filenameRegex: /.*/,
    preProcessingCategory: 'text'
  }
}
