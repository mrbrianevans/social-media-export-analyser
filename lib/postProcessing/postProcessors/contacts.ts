import { PostProcess } from '../../typedefs/PostProcess'
import { processCsvContacts } from '../../vendors/google/Contacts'
import { processVCardContacts } from '../../vendors/google/VCardContacts'

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
  component: 'ContactList',
  postProcessingFunction: processCsvContacts
}

export const ContactsVcfPostProcess: PostProcess = {
  name: 'Contacts',
  code: 'contacts-vcf',
  classifier: {
    topLevelIsArray: true,
    filenameRegex: /^.+\.vcf$/,
    preProcessingCategory: 'vcard',
    itemCriteria: {}
  },
  component: 'ContactList',
  postProcessingFunction: processVCardContacts
}
