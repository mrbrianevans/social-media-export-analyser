import type {
  Tweet,
  TweetEntity
} from '../../../../../lib/vendors/twitter/Tweets'
interface ChunkedText {
  text: string
  type: 'text' | 'user mention' | 'url' | 'symbol' | 'hashtag'
  data?: any
}
interface IntermediateShape {
  type: 'text' | 'user mention' | 'url' | 'symbol' | 'hashtag'
  data: TweetEntity
  start: number
  end: number
}
export function chunkTweetText(tweet: Tweet): ChunkedText[] {
  const { user_mentions, urls, hashtags, symbols } = tweet.entities

  const allEntities: IntermediateShape[] = [
    ...user_mentions.map((data) => ({
      type: 'user mention' as IntermediateShape['type'],
      data,
      start: Number(data.indices[0]),
      end: Number(data.indices[1])
    })),
    ...urls.map((data) => ({
      type: 'url' as IntermediateShape['type'],
      data,
      start: Number(data.indices[0]),
      end: Number(data.indices[1])
    })),
    ...hashtags.map((data) => ({
      type: 'hashtag' as IntermediateShape['type'],
      data,
      start: Number(data.indices[0]),
      end: Number(data.indices[1])
    })),
    ...symbols.map((data) => ({
      type: 'symbol' as IntermediateShape['type'],
      data,
      start: Number(data.indices[0]),
      end: Number(data.indices[1])
    }))
  ]
  allEntities.sort(
    (a, b) => Number(a.data.indices[0]) - Number(b.data.indices[0])
  )
  return insertNextEntity(
    [{ type: 'text', text: tweet.full_text }],
    allEntities
  )
}

const insertNextEntity = (
  outputArray: ChunkedText[],
  entities: IntermediateShape[],
  priorLength = 0
): ChunkedText[] => {
  if (entities.length > 1) console.log(entities.length, 'entities to insert')
  if (entities.length === 0) return outputArray
  const text = outputArray.splice(-1)[0]
  if (text.type !== 'text') throw new Error('Cannot chunk tweet text entities')
  const { type, data } = entities.shift()
  const [start, end] = data.indices.map((i) => Number(i))
  outputArray.push(
    { text: text.text.slice(0, start - priorLength), type: 'text' },
    {
      text: text.text.slice(start - priorLength, end - priorLength),
      type,
      data
    },
    { text: text.text.slice(end - priorLength), type: 'text' }
  )
  return insertNextEntity(outputArray, entities, end)
}

/*
input: 'content @handle https://url.com more content'
and: ["data.indices"=[ 6,13] ]

return a list like this:

[
  {text: ' content ', type: 'text', data={}},
  {text: '@handle', type: 'user mention', data={}},
  {text: 'https://url.com', type: 'http url', data={}},
  {text: ' more content', type: 'text', data={}}
]

 */
