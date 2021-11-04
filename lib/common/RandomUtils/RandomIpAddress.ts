import { RandInt } from './RandomNumberUtils'
import { RandElem } from './RandomArrayUtils'
import { HexCharacters } from './RandomContent/Characters'
import { repeat } from '../ArrayUtils'

export const generateRandomIpAddress = (ipv6 = false): string => {
  if (ipv6) {
    return repeat(8, () =>
      repeat(4, () => RandElem(HexCharacters)).join('')
    ).join('.')
  } else {
    return repeat(4, () => RandInt(0, 999)).join('.')
  }
}
