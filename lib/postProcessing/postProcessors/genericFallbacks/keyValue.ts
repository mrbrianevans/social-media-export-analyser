import { PostProcess } from '../../../typedefs/PostProcess'

export const KeyValuePostProcess: PostProcess = {
  code: 'simple-key-value',
  classifier: {
    filenameRegex: /.*/,
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    itemCriteria: {
      maxDepth: 1
    }
  },
  component: 'JsonEditor'
}

export const NestedKeyValuePostProcess: PostProcess = {
  code: 'nested-key-value',
  classifier: {
    filenameRegex: /.*/,
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    itemCriteria: {
      minDepth: 2
    }
  },
  component: 'JsonEditor'
}
