import { PostProcess } from '../../../typedefs/PostProcess'

export const TabularDataPostProcess: PostProcess = {
  code: 'tabular',
  classifier: {
    filenameRegex: /.*\.(csv|json)$/,
    topLevelIsArray: true,
    itemCriteria: {
      maxDepth: 1
    }
  },
  component: 'VaadinGrid'
}

export const ArrayDataPostProcess: PostProcess = {
  code: 'array',
  classifier: {
    filenameRegex: /.*\.(json)$/,
    topLevelIsArray: true,
    itemCriteria: {
      maxDepth: 0
    }
  },
  component: 'StringBox'
}
