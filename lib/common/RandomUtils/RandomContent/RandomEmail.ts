import { RandElem } from '../RandomArrayUtils'
import { RandInt } from '../RandomNumberUtils'
import { generateUsername } from './RandomUsername'

const EmailDomains = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'protonmail.com'
]

export const generateEmail = (firstName?: string, lastName?: string) => {
  const domain = RandElem(EmailDomains)
  let username = generateUsername(firstName, lastName)
  return `${username}${RandInt(1, 1000)}@${domain}`.toLowerCase()
}
