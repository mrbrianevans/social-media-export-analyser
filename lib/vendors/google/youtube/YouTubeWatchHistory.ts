import { PostProcessor } from '../../../typedefs/PostProcess'
import type { CheerioAPI } from 'cheerio'
import { getFrequencyTables } from '../../../common/FrequencyAnalysis'
import { TimeSeries } from '../../../common/TimeSeriesAnalysis'

type YouTubeWatchHistory = {
  video: string
  videoUrl?: string
  channel: string
  channelUrl?: string
  date: string
}[]

export const processYouTubeWatchHistory: PostProcessor<
  { doc: CheerioAPI },
  YouTubeWatchHistory
> = ({
  preProcessedOutput: {
    data: { doc }
  }
}) => {
  console.time('Get data from HTML')

  /* eslint-disable @typescript-eslint/ban-ts-comment */
  const data = doc
    .root()
    .children()
    .first()
    .children()
    .last()
    .children()
    .first()
    .children()
    .map((i, e) => e.firstChild)
    .toArray()
    .map((outer) => ({
      //@ts-ignore - it doesn't know that the node has children?
      video: outer.children[1].children[1].children[0]?.data,
      // videoUrl: outer.children[1].children[1].attribs.href,
      //@ts-ignore - it doesn't know that the node has children?
      channel: outer.children[1].children[3]?.children?.[0]?.data,
      // channelUrl: outer.children[1].children[3]?.attribs?.href,
      //@ts-ignore - it doesn't know that the node has children?
      date: outer.children[1].children[5]?.data
    }))
    .filter((e) => e.channel && e.date && e.video)
  console.timeEnd('Get data from HTML')

  const freq = getFrequencyTables(
    data.map((d) => d.video),
    20,
    ['word', 'ordinal', 'hashtag', 'emoji']
  )
  const ts = new TimeSeries(
    data.map((d) => d.date),
    'Videos watched'
  ).metadata
  const topics = {
    documents: Array.from(new Set(data.map((d) => d.video))),
    options: {
      numberOfTopics: Math.min(
        data.length,
        Math.max(Math.ceil(data.length / 10), 10)
      )
    }
  }
  return {
    data,
    metadata: { freq, ts, topics },
    title: 'YouTube Watch History'
  }
}

//todo: write fake data generator for this
