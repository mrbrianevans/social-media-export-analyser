import { RandInt } from './RandomNumberUtils'

export const RandDate = (
  minDaysAgo: number = 10,
  maxDaysAgo: number = 1000
) => {
  return new Date(
    Date.now() - RandInt(minDaysAgo * 86400000, maxDaysAgo * 86400000)
  )
}
