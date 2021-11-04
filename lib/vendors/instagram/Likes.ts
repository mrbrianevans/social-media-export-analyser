import { PostProcessor } from '../../typedefs/PostProcess'
import { longDateTime } from '../../common/DateUtils'

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
