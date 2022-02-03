import { PostProcessor } from '../../typedefs/PostProcess'
import * as Papa from 'papaparse'
import { getRandomFullName } from '../../common/RandomUtils/RandomContent/RandomNames'
import { generateRandomPhoneNumber } from '../../common/RandomUtils/RandomPhoneNumber'
import { OneIn, RandBoolean } from '../../common/RandomUtils/RandomBooleanUtils'
import { generateEmail } from '../../common/RandomUtils/RandomContent/RandomEmail'
import { arrayObjectKeys, objectKeys } from '../../common/ArrayUtils'
import { getRandomProfilePhoto } from '../../common/RandomUtils/RandomProfilePhoto'
import { RandInt } from '../../common/RandomUtils/RandomNumberUtils'
export type CsvContacts = CsvContactsChild[]
export interface CsvContactsChild {
  Name: string
  'Given Name': string
  'Additional Name'?: string
  'Family Name': string
  'Yomi Name'?: string
  'Given Name Yomi'?: string
  'Additional Name Yomi'?: string
  'Family Name Yomi'?: string
  'Name Prefix'?: string
  'Name Suffix'?: string
  Initials?: string
  Nickname?: string
  'Short Name'?: string
  'Maiden Name'?: string
  Birthday?: string
  Gender?: string
  Location?: string
  'Billing Information'?: string
  'Directory Server'?: string
  Mileage?: string
  Occupation?: string
  Hobby?: string
  Sensitivity?: string
  Priority?: string
  Subject?: string
  Notes?: string
  Language?: string
  Photo?: string
  'Group Membership': string
  'E-mail 1 - Type'?: string
  'E-mail 1 - Value'?: string
  'E-mail 2 - Type'?: string
  'E-mail 2 - Value'?: string
  'E-mail 3 - Type'?: string
  'E-mail 3 - Value'?: string
  'IM 1 - Type'?: string
  'IM 1 - Service'?: string
  'IM 1 - Value'?: string
  'Phone 1 - Type': string
  'Phone 1 - Value': string
  'Phone 2 - Type'?: string
  'Phone 2 - Value'?: string
  'Address 1 - Type'?: string
  'Address 1 - Formatted'?: string
  'Address 1 - Street'?: string
  'Address 1 - City'?: string
  'Address 1 - PO Box'?: string
  'Address 1 - Region'?: string
  'Address 1 - Postal Code'?: string
  'Address 1 - Country'?: string
  'Address 1 - Extended Address'?: string
  'Organization 1 - Type': string
  'Organization 1 - Name': string
  'Organization 1 - Yomi Name'?: string
  'Organization 1 - Title'?: string
  'Organization 1 - Department'?: string
  'Organization 1 - Symbol'?: string
  'Organization 1 - Location'?: string
  'Organization 1 - Job Description'?: string
  'Website 1 - Type'?: string
  'Website 1 - Value'?: string
  'Custom Field 1 - Type'?: string
  'Custom Field 1 - Value'?: string
}
export interface Contact {
  fullName: string
  profilePictureUrl?: string
  firstName: string
  lastName: string
  phoneNumbers: { phoneNumber: string; label: string }[]
  emailAddresses: { emailAddress: string; label: string }[]
  organisation?: string
  address?: {
    streetAddress: string
    postCode: string
  }
  otherDetails: Record<string, any>
}

export const processCsvContacts: PostProcessor<CsvContacts, Contact[]> = ({
  preProcessedOutput: { data, metadata }
}) => {
  const { fields } = metadata
  const contacts: Contact[] = []
  for (const contact of data) {
    contacts.push({
      address:
        contact['Address 1 - Postal Code'] && contact['Address 1 - Street']
          ? {
              postCode: contact['Address 1 - Postal Code'],
              streetAddress: contact['Address 1 - Street']
            }
          : null,
      emailAddresses: [
        {
          emailAddress: contact['E-mail 1 - Value'],
          label: contact['E-mail 1 - Type']
        }
      ],
      firstName: contact['Given Name'],
      fullName: contact.Name,
      lastName: contact['Family Name'],
      organisation: contact['Organization 1 - Name'],
      otherDetails: Object.fromEntries(
        Object.entries(contact).filter(([, v]) => v)
      ),
      phoneNumbers: [
        {
          phoneNumber: contact['Phone 1 - Value'],
          label: contact['Phone 1 - Type']
        }
      ],
      profilePictureUrl: contact.Photo
    })
  }
  return {
    data: contacts,
    title: 'Contacts',
    metadata
  }
}

function generateCsvContacts(qty = 10): CsvContacts {
  const contacts = new Set<CsvContacts[number]>()
  for (let i = 0; i < qty; i++) {
    const isMale = RandBoolean()
    const Name = getRandomFullName(isMale)
    const contact: CsvContactsChild = {
      'Family Name': Name.split(' ').slice(1).join(' '),
      'Given Name': Name.split(' ').slice(0, 1).join(' '),
      'Group Membership': '* myContacts',
      'Organization 1 - Name': '',
      'Organization 1 - Type': '', // can be 'unknown'
      'Phone 1 - Type': 'Mobile',
      'Phone 1 - Value': generateRandomPhoneNumber(),
      Name
    }
    if (OneIn(3)) {
      contact['E-mail 1 - Type'] = '* '
      contact['E-mail 1 - Value'] = generateEmail(
        Name.split(' ').at(0),
        Name.split(' ').at(-1)
      )
    }
    if (OneIn(5)) {
      contact['Photo'] = getRandomProfilePhoto(isMale)
    }
    if (OneIn(5)) {
      contact['Phone 2 - Type'] = 'Home'
      contact['Phone 2 - Value'] = generateRandomPhoneNumber()
    }
    contacts.add(contact)
  }
  return Array.from(contacts)
}

export function generateContactsFile(qty = 10): string {
  const contacts = generateCsvContacts(qty)
  return Papa.unparse(contacts, { columns: arrayObjectKeys(contacts, null) })
}
