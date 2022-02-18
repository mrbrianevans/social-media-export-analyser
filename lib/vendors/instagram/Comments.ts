import { PostProcessor } from '../../typedefs/PostProcess'
import { formatDateEurTimeWithTz, longDateTime } from '../../common/DateUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateSentence } from '../../common/RandomUtils/RandomContent/RandomSentence'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'
import { commentWords } from '../../common/RandomUtils/RandomContent/RandomWords'
import { TimeSeries } from '../../common/TimeSeriesAnalysis'
import { TopicsMetadata } from '../../common/TopicsMetadata'

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
  const comments = input.preProcessedOutput.data.media_comments.map(
    ([date, content, username]) => ({
      date,
      content,
      username
    })
  )
  input.preProcessedOutput.metadata.ts = new TimeSeries(
    comments.map((d) => d.date),
    'Instagram comments'
  ).metadata
  input.preProcessedOutput.metadata.topics = TopicsMetadata(
    comments.map((d) => d.content)
  )
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
