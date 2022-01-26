import { PostProcessor } from '../../../typedefs/PostProcess'
import * as cheerio from 'cheerio'
import { Node, NodeWithChildren } from 'cheerio'

export const processYouTubeWatchHistory: PostProcessor = ({
  preProcessedOutput: {
    data: { text: htmlString }
  }
}) => {
  console.time('Parse HTML')
  const doc = cheerio.load(htmlString, {})
  console.timeEnd('Parse HTML')
  console.time('Get data from HTML')
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
  return {
    data,
    metadata: {},
    title: 'HTML Doc'
  }
}

//todo: write fake data generator for this
