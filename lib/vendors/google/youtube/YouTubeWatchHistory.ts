import { PostProcessor } from '../../../typedefs/PostProcess'
import type { CheerioAPI } from 'cheerio'
import { getFrequencyTables } from '../../../common/FrequencyAnalysis'
import { TimeSeries } from '../../../common/TimeSeriesAnalysis'
import { WellKnownMetadata } from '../../../typedefs/PreProcess'
import { TopicsMetadata } from '../../../common/TopicsMetadata'
import { DateFormatter } from '../../../common/DateUtils'
import { shortMonths } from '../../../common/Constants'
import { getRandomYouTubeVideo } from '../../../common/RandomUtils/RandomYouTubeVideo'
import { RandDate } from '../../../common/RandomUtils/RandomDateUtils'

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
  const topics = TopicsMetadata(data.map((d) => d.video))
  return {
    data,
    metadata: { freq, ts, topics },
    title: 'YouTube Watch History'
  }
}

// fake data generator for youtube watch history to test processing
export function generateYouTubeWatchHistory({ qty = 10 }) {
  const wrapItems = (items: string) => {
    // stripped down to essential css
    const css = `@charset"UTF-8";html{color:rgba(0,0,0,.87)}::selection{background:#b3d4fc;text-shadow:none}html{width:100%;height:100%;-ms-touch-action:manipulation;touch-action:manipulation}body{width:100%;min-height:100%}[hidden]{display:none!important}body,html{font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;line-height:20px}p{padding:0;font-weight:400;line-height:24px;font-size:14px;letter-spacing:0;margin:0 0 16px}a{color:#448aff;font-weight:500}.mdl-typography--title{font-family:Roboto,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:1;letter-spacing:0.02em}.mdl-typography--body-2{font-size:14px;font-weight:700;line-height:24px;letter-spacing:0}.mdl-typography--body-1{font-size:14px;font-weight:400;line-height:24px;letter-spacing:0}.mdl-typography--caption{font-size:12px;font-weight:400;line-height:1;letter-spacing:0}.mdl-typography--text-right{text-align:right}.mdl-shadow--2dp{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}.mdl-shadow--24dp{box-shadow:0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)}.mdl-grid{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap;margin:0 auto;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}.mdl-cell{box-sizing:border-box}.mdl-grid{padding:8px}.mdl-cell{margin:8px;width:calc(33.3333333333% - 16px)}.mdl-cell--6-col{width:calc(50% - 16px)}.mdl-cell--12-col{width:calc(100% - 16px)}body{margin:0;padding:5px;background:#eee}.mdl-cell{background-color:#fff}.content-cell.mdl-cell{color:rgba(0,0,0,.54)}.header-cell.mdl-cell{border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgba(0,0,0,.1)}`
    return `<html><head><title>My Activity History</title><style type='text/css'>/**
     * material-design-lite - Material Design Components in CSS, JS and HTML
     * @version v1.3.0
     * @license Apache-2.0
     * @copyright 2015 Google, Inc.
     * @link https://github.com/google/material-design-lite
     */${css}</style></head><body><div class='mdl-grid'>${items}</div></body></html>`
  }

  interface ItemParams {
    music: boolean
    videoUrl: string
    channelUrl: string
    videoTitle: string
    channelName: string
    date: Date
  }

  // outputs date in form Mar 21, 2016, 10:30:52 AM BST
  const formatDate: DateFormatter = (date) => {
    const time = Intl.DateTimeFormat('default', {
      timeStyle: 'long',
      hour12: true
    }).format(date)
    return `${
      shortMonths[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}, ${time.toUpperCase()}`
  }
  //todo: something is not quite right with the generated html. it causes a parsing error:
  // s.children is undefined
  const getItem = ({
    music = false,
    videoUrl,
    channelUrl,
    videoTitle,
    channelName,
    date
  }: ItemParams) => `<div class='outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp'>
    <div class='mdl-grid'>
        <div class='header-cell mdl-cell mdl-cell--12-col'>
            <p class='mdl-typography--title'>YouTube${
              music ? ' Music' : ''
            }<br></p>
        </div>
        <div class='content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1'>Watched <a href='${videoUrl}'>${videoTitle}</a>
        <br>
        <a href='${channelUrl}'>${channelName}</a><br>${formatDate(date)}</div>
        <div class='content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1 mdl-typography--text-right'></div>
        <div class='content-cell mdl-cell mdl-cell--12-col mdl-typography--caption'><b>Products:</b><br>&emsp;YouTube<br></div>
    </div>
</div>`

  const items = Array.from({ length: qty })
    .map((_, i) => {
      const video = getRandomYouTubeVideo()
      return getItem({
        channelName: video.channel.name,
        channelUrl: video.channel.url ?? 'https://www.youtube.com/c/',
        date: RandDate(),
        music: video.channel.category === 'Music',
        videoTitle: video.video.title,
        videoUrl: video.video.url ?? 'https://www.youtube.com/watch?v='
      })
    })
    .join('')
  return wrapItems(items)
}
