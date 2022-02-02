import { ParsedVCards } from 'vcard4-ts'
import { PostProcessor } from '../../typedefs/PostProcess'
import { Contact, CsvContacts } from './Contacts'

export const processVCardContacts: PostProcessor<
  ParsedVCards['vCards'],
  Contact[]
> = ({ preProcessedOutput: { data, metadata, title } }) => {
  const contacts: Contact[] = []
  for (const contact of data) {
    contacts.push({
      address: contact.ADR?.[0]
        ? {
            postCode: contact.ADR[0].value.postalCode?.[0],
            streetAddress: contact.ADR[0].value.streetAddress?.[0]
          }
        : null,
      emailAddresses: contact.EMAIL?.map((t) => ({
        label: t.parameters?.TYPE?.at(0),
        emailAddress: t.value
      })),
      firstName: contact.N?.value.givenNames.join(' '),
      fullName: contact.FN[0]?.value,
      lastName: contact.N?.value.familyNames.join(' '),
      organisation: contact.ORG?.[0]?.value[0],
      otherDetails: contact.x,
      phoneNumbers: contact.TEL?.map((t) => ({
        label: t.parameters?.TYPE?.[0],
        phoneNumber: t.value
      })),
      profilePictureUrl: contact.PHOTO?.[0]?.value
    })
  }
  return { data: contacts, metadata, title }
}
