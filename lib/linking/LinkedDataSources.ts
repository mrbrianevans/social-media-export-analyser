import { PostProcessedOutput, PostProcessor } from '../typedefs/PostProcess'
import { YoutubeWatchSearchHistoryLinkedProcessor } from './processors/youtubeWatchSearchHistory'
import { ComponentName } from '../typedefs/Components'

// every time a new file is added, check if there is the right combination for this list

export type LinkedProcessor = (
  /**
   * an array of PostProcessedOutputs of the matching data sources
   */
  inputs: PostProcessedOutput[]
) => PostProcessedOutput | null

interface LinkedDataSource {
  linker: LinkedProcessor
  requiredPostprocessorCodes: string[]
  component: ComponentName
}

export const linkedDataSources: LinkedDataSource[] = [
  // the necessary postprocessed data sources, the linker (which is a post processor itself)
  {
    requiredPostprocessorCodes: [
      'youtube-watch-history',
      'youtube-search-history'
    ],
    linker: YoutubeWatchSearchHistoryLinkedProcessor,
    component: 'YouTubeSearchAndWatchHistory'
  }
]
