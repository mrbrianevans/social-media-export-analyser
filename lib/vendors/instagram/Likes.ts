import { PostProcessor } from '../../typedefs/PostProcess'
import { formatDateEurTimeWithTz, longDateTime } from '../../common/DateUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'
import { TimeSeries } from '../../common/TimeSeriesAnalysis'

type Like = [string, string]
export interface InstagramLikes {
  media_likes: Like[]
  comment_likes: Like[]
}

export type InstagramLikesPostProcess = {
  username: string
  date: string
  postType: 'comment' | 'media'
}[]

export const instagramLikesPostProcessFunction: PostProcessor<
  InstagramLikes,
  InstagramLikesPostProcess
> = (input) => {
  const mediaLikes: (InstagramLikesPostProcess[number] & {
    timestamp: number
  })[] = input.preProcessedOutput.data.media_likes.map((l) => ({
    username: l[1],
    date: longDateTime(new Date(l[0])),
    postType: 'media',
    timestamp: new Date(l[0]).getTime()
  }))
  const commentLikes: (InstagramLikesPostProcess[number] & {
    timestamp: number
  })[] = input.preProcessedOutput.data.comment_likes.map((l) => ({
    username: l[1],
    date: longDateTime(new Date(l[0])),
    postType: 'comment',
    timestamp: new Date(l[0]).getTime()
  }))
  const data = mediaLikes
    .concat(...commentLikes)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((a) => ({
      username: a.username,
      date: a.date,
      postType: a.postType
    }))
  input.preProcessedOutput.metadata.ts = new TimeSeries(
    data.map((d) => d.date),
    'Posts liked on Instagram'
  ).metadata
  return {
    ...input.preProcessedOutput,
    data
  }
}

export const generateInstagramLikes = ({ qty = 10 }): InstagramLikes => {
  const likes: [string, string][] = Array.from({ length: qty }, () => ({
    date: formatDateEurTimeWithTz(RandDate()),
    username: generateUsername()
  })).map((c) => [c.date, c.username])
  return {
    media_likes: likes.slice(0, Math.floor(qty / 2)),
    comment_likes: likes.slice(Math.floor(qty / 2))
  }
}
