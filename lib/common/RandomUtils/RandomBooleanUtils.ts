import { RandInt } from './RandomNumberUtils'

export const RandBoolean = () => {
  const int = RandInt(0, 1)
  return int === 1
}
