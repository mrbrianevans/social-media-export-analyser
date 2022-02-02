import { PostProcess } from '../../typedefs/PostProcess'
import { processContacts } from '../../vendors/google/Contacts'

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
  component: 'VaadinGrid',
  postProcessingFunction: processContacts
}
