import { RandElem } from '../RandomArrayUtils'
import { FirstNames, LastNames } from './RandomNames'
import { RandInt } from '../RandomNumberUtils'

export const generateUsername = (firstName?: string, lastName?: string) => {
  firstName ??= RandElem(FirstNames)
  lastName ??= RandElem(LastNames)
  const id = RandInt(3)
  let username
  switch (RandInt(1, 6)) {
    case 1:
      username = `${firstName[0]}${lastName}`
      break
    case 2:
      username = `${firstName}${lastName}`
      break
    case 3:
      username = `${firstName}${id}`
      break
    case 4:
      username = `${firstName.slice(0, 3)}${lastName}${id}`
      break
    case 5:
      username = `${firstName}${id}`
      break
    case 6:
      username = `${lastName}${id}`
      break
  }
  return username.toLowerCase().replace(/[^0-9a-z]/gi, 'x')
}
