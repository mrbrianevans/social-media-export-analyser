import { PostProcessor } from '../../typedefs/PostProcess'
import { formatDateEurTimeWithTz, longDateTime } from '../../common/DateUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'

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
  const mediaLikes: InstagramLikesPostProcess =
    input.preProcessedOutput.data.media_likes.map((l) => ({
      username: l[1],
      date: longDateTime(new Date(l[0])),
      postType: 'media'
    }))
  const commentLikes: InstagramLikesPostProcess =
    input.preProcessedOutput.data.comment_likes.map((l) => ({
      username: l[1],
      date: longDateTime(new Date(l[0])),
      postType: 'comment'
    }))
  return {
    ...input.preProcessedOutput,
    data: mediaLikes.concat(...commentLikes)
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
