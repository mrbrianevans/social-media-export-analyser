import { RandElem } from './RandomArrayUtils'
import {
  ContentCreators,
  YouTubeVideos
} from './RandomContent/RandomYouTubeContent'

export function getRandomYouTubeVideo() {
  const video = RandElem(YouTubeVideos)
  const channel = ContentCreators.find((c) => c.name === video.channel)
  if (!channel) {
    console.log('Could not find channel for video', video)
  }
  return {
    video,
    channel
  }
}
