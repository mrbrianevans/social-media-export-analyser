import { LinkedProcessor } from '../LinkedDataSources'
import { YouTubeSearchHistory } from '../../vendors/google/youtube/YouTubeSearchHistory'
import { YouTubeWatchHistory } from '../../vendors/google/youtube/YouTubeWatchHistory'
import { parseDate } from '../../common/DateUtils'

export type YoutubeWatchSearchHistory = {
  search: YouTubeSearchHistory[number]
  video: YouTubeWatchHistory[number]
}[]

/**
 * Combines YouTube search and watch history data to show which searches led to videos watched.
 */
export const YoutubeWatchSearchHistoryLinkedProcessor: LinkedProcessor = (
  inputs
) => {
  const searchHistoryInput = inputs.find(
    (input) =>
      input.metadata.postProcessingCategory ===
      'YouTubeSearchHistoryPostProcess'
  )
  const watchHistoryInput = inputs.find(
    (input) =>
      input.metadata.postProcessingCategory === 'YouTubeWatchHistoryPostProcess'
  )
  if (!searchHistoryInput || !watchHistoryInput) return null

  const searches = searchHistoryInput.data as YouTubeSearchHistory
  const watched = watchHistoryInput.data as YouTubeWatchHistory
  watched.sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
  )
  // for each search, find the first video watched afterwards
  const searchedVideos: YoutubeWatchSearchHistory = []
  for (const search of searches) {
    const searchDate = parseDate(search.date)
    const firstVideo = watched.find(
      (video) => parseDate(video.date) > searchDate
    )
    const minThreshold = 1000 * 60 * 5 // video must be watched within 5 minutes of search
    if (
      firstVideo &&
      parseDate(firstVideo.date).getTime() - searchDate.getTime() < minThreshold
    )
      searchedVideos.push({ search, video: firstVideo })
  }
  return {
    metadata: {},
    data: searchedVideos,
    title: 'Linked Youtube Data',
    component: 'YouTubeSearchAndWatchHistory'
  }
}
