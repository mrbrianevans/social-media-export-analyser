import { PostProcessor } from '../../typedefs/PostProcess'
import { formatDateEurTimeWithTz, longDateTime } from '../../common/DateUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateSentence } from '../../common/RandomUtils/RandomContent/RandomSentence'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'
import { commentWords } from '../../common/RandomUtils/RandomContent/RandomWords'

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
    date: longDateTime(new Date(c[0])),
    content: c[1],
    username: c[2]
  }))
  return {
    title: input.preProcessedOutput.title,
    data: comments,
    metadata: input.preProcessedOutput.metadata
  }
}

export const generateInstagramComments = ({ qty = 10 }): InstagramComments => {
  const media_comments: [string, string, string][] = Array.from(
    { length: qty },
    () => ({
      date: formatDateEurTimeWithTz(RandDate()),
      content: generateSentence(1, 5, commentWords),
      username: generateUsername()
    })
  ).map((c) => [c.date, c.content, c.username])
  return { media_comments }
}
