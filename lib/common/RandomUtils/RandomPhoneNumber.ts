import { RandInt } from './RandomNumberUtils'

export function generateRandomPhoneNumber() {
  const firstPart = '0' + RandInt(4).toString()
  const secondPart = RandInt(6).toString()
  return firstPart + ' ' + secondPart
}
