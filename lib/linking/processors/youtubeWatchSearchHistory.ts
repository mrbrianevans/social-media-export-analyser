import { LinkedProcessor } from '../LinkedDataSources'
import { YouTubeSearchHistory } from '../../vendors/google/youtube/YouTubeSearchHistory'
import { YouTubeWatchHistory } from '../../vendors/google/youtube/YouTubeWatchHistory'

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
    (input) => input.metadata.filename === 'search-history.html'
  )
  const watchHistoryInput = inputs.find(
    (input) => input.metadata.filename === 'search-history.html'
  )
  if (!searchHistoryInput || !watchHistoryInput) return null

  const searches = searchHistoryInput.data as YouTubeSearchHistory
  const watched = watchHistoryInput.data as YouTubeWatchHistory
  watched.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  // for each search, find the first video watched afterwards
  const searchedVideos: YoutubeWatchSearchHistory = []
  for (const search of searches) {
    const searchDate = new Date(search.date)
    const firstVideo = watched.find(
      (video) => new Date(video.date) > searchDate
    )
    const minThreshold = 1000 * 60 * 5 // video must be watched within 5 minutes of search
    if (
      firstVideo &&
      new Date(firstVideo.date).getTime() - searchDate.getTime() < minThreshold
    )
      searchedVideos.push({ search, video: firstVideo })
  }

  return {
    metadata: {},
    data: searchedVideos,
    title: 'Linked Youtube Data'
  }
}
