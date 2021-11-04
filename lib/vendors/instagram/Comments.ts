import { PostProcessor } from '../../typedefs/PostProcess'

export interface InstagramComments {
  media_comments: [string, string, string][]
}
export interface InstagramCommentsProcessed {
  [key: number]: { date: string; content: string; username: string }
}
export const instagramCommentsPostProcessingFunction: PostProcessor<
  InstagramComments,
  InstagramCommentsProcessed
> = (input) => {
  const comments = input.preProcessedOutput.data.media_comments.map((c) => ({
    date: c[0],
    content: c[1],
    username: c[2]
  }))
  return {
    title: input.preProcessedOutput.title,
    data: comments,
    metadata: input.preProcessedOutput.metadata
  }
}
