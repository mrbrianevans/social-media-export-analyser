import { PostProcess } from '../../typedefs/PostProcess'

export const ContactsCsvPostProcess: PostProcess = {
  name: 'Contacts',
  code: 'contacts-csv',
  classifier: {
    topLevelIsArray: true,
    filenameRegex: /^contacts\.csv$/,
    preProcessingCategory: 'csv',
    itemCriteria: {
      maxDepth: 1
    }
  },
  component: 'VaadinGrid'
}
