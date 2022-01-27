import { PostProcess } from '../../typedefs/PostProcess'
import { processYouTubeWatchHistory } from '../../vendors/google/youtube/YouTubeWatchHistory'
import { processYouTubeSearchHistory } from '../../vendors/google/youtube/YouTubeSearchHistory'

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
    itemCriteria: { keys: ['doc'] }
  },
  postProcessingFunction: processYouTubeWatchHistory,
  component: 'VaadinGrid'
}

export const YouTubeSearchHistoryPostProcess: PostProcess = {
  name: 'YouTube Search History',
  code: 'youtube-search-history',
  nameFormat: 'YouTube Search History',
  vendor: 'YouTube',
  classifier: {
    fileTypes: ['text/html'],
    preProcessingCategory: 'html',
    filenameRegex: /^search-history\.html$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['doc'] }
  },
  postProcessingFunction: processYouTubeSearchHistory,
  component: 'VaadinGrid'
}
