import { RandElem } from '../RandomArrayUtils'
import { FirstNames, LastNames } from './RandomNames'
import { RandInt } from '../RandomNumberUtils'

export const generateUsername = (firstName?: string, lastName?: string) => {
  firstName ??= RandElem(FirstNames)
  lastName ??= RandElem(LastNames)
  let username
  switch (RandInt(1, 6)) {
    case 1:
      username = `${firstName[0]}${lastName}`
      break
    case 2:
      username = `${firstName}${lastName}`
      break
    case 3:
      username = `${firstName}${lastName.slice(0, 3)}`
      break
    case 4:
      username = `${firstName.slice(0, 3)}${lastName}`
      break
    case 5:
      username = `${firstName}`
      break
    case 6:
      username = `${lastName}`
      break
  }
  return username.toLowerCase()
}
