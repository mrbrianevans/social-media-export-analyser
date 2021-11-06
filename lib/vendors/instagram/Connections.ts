import { RandInt } from '../../common/RandomUtils/RandomNumberUtils'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { formatDateEurTimeWithTz } from '../../common/DateUtils'
import { PostProcessor } from '../../typedefs/PostProcess'

export interface InstagramConnections {
  dismissed_suggested_users?: Record<string, string>
  following?: Record<string, string>
  followers?: Record<string, string>
  follow_requests_sent?: Record<string, string>
  close_friends?: Record<string, string>
  hide_stories_from?: Record<string, string>
  blocked_users?: Record<string, string>
}

/**
 * Generate a random set of connections in the format of instagram connections.
 * @param followerQty - number of followers, defaults to random int between 0,10
 * @param followingQty - number of following, defaults to random int between 0,10
 */
export const generateInstagramConnections = ({
  followerQty = RandInt(0, 10),
  followingQty = RandInt(0, 10)
}): InstagramConnections => {
  const followers: InstagramConnections['followers'] = Object.fromEntries(
    Array.from({ length: followerQty }, () => [
      generateUsername(),
      formatDateEurTimeWithTz(RandDate())
    ])
  )
  const following: InstagramConnections['following'] = Object.fromEntries(
    Array.from({ length: followingQty }, () => [
      generateUsername(),
      formatDateEurTimeWithTz(RandDate())
    ])
  )
  const closeFriends = Object.fromEntries(
    Object.values(following)
      .filter((f) => f in followers)
      .map((f) => [f, formatDateEurTimeWithTz(RandDate())])
  )
  return {
    followers,
    following,
    close_friends: closeFriends.length ? closeFriends : undefined
  }
}

export const instagramConnectionsPostProcessingFunction: PostProcessor<
  InstagramConnections,
  InstagramConnections
> = (input) => {
  for (const [key, valueObject] of Object.entries(
    input.preProcessedOutput.data
  )) {
    const newValueObject: Record<string, string> = {}
    for (const [username, dateString] of Object.entries(
      <Record<string, string>>valueObject
    )) {
      newValueObject['@' + username] = Intl.DateTimeFormat('en', {
        dateStyle: 'long',
        timeStyle: 'medium'
      }).format(new Date(dateString))
    }
    input.preProcessedOutput.data[key] = newValueObject
  }
  return input.preProcessedOutput
}
