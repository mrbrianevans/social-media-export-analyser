import { PostProcessor } from '../../../typedefs/PostProcess'
import type { CheerioAPI } from 'cheerio'
import { getFrequencyTables } from '../../../common/FrequencyAnalysis'

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
  // get most commonly searched for words
  const freq = getFrequencyTables(
    data.map((d) => d.searchTerm),
    20,
    ['word']
  )
  console.log('Frequencies: ')
  for (const [category, frequencyTable] of Object.entries(freq)) {
    console.log(category)
    console.log(frequencyTable)
    console.log()
  }
  return {
    data,
    metadata: { freq },
    title: 'YouTube Search History'
  }
}

//todo: write fake data generator for this
