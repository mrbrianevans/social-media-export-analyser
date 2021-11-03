import { RandInt } from './RandomNumberUtils'

export const RandDate = (minDaysAgo = 10, maxDaysAgo = 1000) => {
  return new Date(
    Date.now() - RandInt(minDaysAgo * 86400000, maxDaysAgo * 86400000)
  )
}
