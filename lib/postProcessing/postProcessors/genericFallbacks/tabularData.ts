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
