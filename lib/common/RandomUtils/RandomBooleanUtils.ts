import { RandInt } from './RandomNumberUtils'

export const RandBoolean = () => {
  const int = RandInt(0, 1)
  return int === 1
}

/**
 * Return a boolean with a 1 in x chance of being true.
 * @param howMany - larger number for lower probability. Set to 2 for equal chance.
 */
export const OneIn = (howMany: number) => {
  const int = RandInt(0, howMany - 1)
  return int === 0
}
