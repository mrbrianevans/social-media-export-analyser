import { PostProcess } from '../../../typedefs/PostProcess'

export const KeyValuePostProcess: PostProcess = {
  code: 'simple-key-value',
  classifier: {
    filenameRegex: /.*/,
    topLevelIsArray: false,
    itemCriteria: {
      maxDepth: 2
    }
  },
  component: 'KeyValueCard'
}

export const NestedKeyValuePostProcess: PostProcess = {
  code: 'nested-key-value',
  classifier: {
    filenameRegex: /.*/,
    topLevelIsArray: false,
    itemCriteria: {
      minDepth: 3
    }
  },
  component: 'JsonEditor'
}

export const NestedArrayPostProcess: PostProcess = {
  code: 'nested-key-value',
  classifier: {
    filenameRegex: /.*/,
    topLevelIsArray: true,
    itemCriteria: {
      minDepth: 2
    }
  },
  component: 'JsonEditor'
}
