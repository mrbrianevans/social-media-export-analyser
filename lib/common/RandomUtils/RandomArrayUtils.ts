import { RandInt } from './RandomNumberUtils'

export const RandElem = <T>(array: T[]): T => {
  const index = RandInt(0, array.length)
  return array[index]
}