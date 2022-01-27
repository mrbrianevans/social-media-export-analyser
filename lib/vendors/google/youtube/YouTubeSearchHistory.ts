import { PostProcessor } from '../../../typedefs/PostProcess'
import type { CheerioAPI } from 'cheerio'

type YouTubeSearchHistory = {
  searchTerm: string
  date: string
}[]

export const processYouTubeSearchHistory: PostProcessor<
  { doc: CheerioAPI },
  YouTubeSearchHistory
> = ({
  preProcessedOutput: {
    data: { doc }
  }
}) => {
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  const data = doc(
    'div.content-cell.mdl-cell.mdl-cell--6-col.mdl-typography--body-1:nth-child(2)'
  )
    .toArray()
    .map((outer) => {
      return {
        // @ts-ignore
        searchTerm: outer.childNodes[1].childNodes[0].data,
        // @ts-ignore
        date: outer.childNodes[3].data
      }
    })
  return {
    data,
    metadata: {},
    title: 'YouTube Search History'
  }
}

//todo: write fake data generator for this
