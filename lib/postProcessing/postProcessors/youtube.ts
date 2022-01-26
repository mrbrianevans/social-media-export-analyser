import { PostProcess } from '../../typedefs/PostProcess'
import { processYouTubeWatchHistory } from '../../vendors/google/youtube/YouTubeWatchHistory'

export const YouTubeWatchHistoryPostProcess: PostProcess = {
  name: 'YouTube Watch History',
  code: 'youtube-watch-history',
  nameFormat: 'YouTube Watch History',
  vendor: 'YouTube',
  classifier: {
    fileTypes: ['text/html'],
    preProcessingCategory: 'html',
    filenameRegex: /^watch-history\.html$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['text'], maxDepth: 1 }
  },
  postProcessingFunction: processYouTubeWatchHistory,
  component: 'VaadinGrid'
}
