import { RandHex } from '../../common/RandomUtils/RandomNumberUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateCaption } from '../../common/RandomUtils/RandomContent/RandomSentence'
import { formatDateEurTimeWithTz, longDateTime } from '../../common/DateUtils'
import { repeat } from '../../common/ArrayUtils'
import { PostProcessor } from '../../typedefs/PostProcess'
import { InstagramLikes, InstagramLikesPostProcess } from './Likes'
import { getFrequencyTables } from '../../common/FrequencyAnalysis'

type DateString =
  `${number}-${number}-${number}T${number}:${number}:${number}+${number}:${number}`
//2021-01-01T19:48:10+00:00
type PathString<
  topLevelDirectory extends string,
  fileExtension extends string = 'mp4' | 'jpg',
  year extends number = number,
  month extends number | string = string
> = `${topLevelDirectory}/${year}${month}/${string}.${fileExtension}`
interface MediaItem {
  caption: string
  taken_at: DateString
  path: string
}

interface Photo extends MediaItem {
  location?: string
  path: PathString<'photos', 'jpg'>
}

interface Video extends MediaItem {
  path: PathString<'videos', 'mp4'>
}

interface Profile extends MediaItem {
  is_active_profile: boolean
  path: PathString<'profile', 'jpg'>
}

interface Story extends MediaItem {
  path: PathString<'stories', 'jpg' | 'mp4'>
}

type TopLevelObject = {
  [key: string]: MediaItem[]
}
export interface Media {
  photos: Photo[]
  profile: Profile[]
  stories: Story[]
  videos: Video[]
}
interface MediaTimestamp {
  timestamp: number
}
interface StoryProcessed extends Story {
  type: 'story'
}
interface ProfileProcessed extends Profile {
  type: 'profile'
}
interface VideoProcessed extends Video {
  type: 'video'
}
interface PhotoProcessed extends Photo {
  type: 'photo'
}

export type InstagramMediaAfterProcessing = ((
  | VideoProcessed
  | StoryProcessed
  | ProfileProcessed
  | PhotoProcessed
) &
  MediaTimestamp)[]

export const instagramMediaPostProcessFunction: PostProcessor<
  Media,
  InstagramMediaAfterProcessing
> = (input) => {
  const d = input.preProcessedOutput.data
  const data: InstagramMediaAfterProcessing = []
  data.push(
    ...d['profile'].map((p) => ({
      ...p,
      type: 'profile' as const,
      timestamp: new Date(p.taken_at).getTime()
    }))
  )
  data.push(
    ...d['stories'].map((p) => ({
      ...p,
      type: 'story' as const,
      timestamp: new Date(p.taken_at).getTime()
    }))
  )
  data.push(
    ...d['photos'].map((p) => ({
      ...p,
      type: 'photo' as const,
      timestamp: new Date(p.taken_at).getTime()
    }))
  )
  data.push(
    ...d['videos'].map((p) => ({
      ...p,
      type: 'video' as const,
      timestamp: new Date(p.taken_at).getTime()
    }))
  )
  data.sort((a, b) => a.timestamp - b.timestamp)
  const freq = getFrequencyTables(
    Array.from(new Set(data.map((d) => d.caption))),
    50,
    ['word', 'hashtag', 'mention', 'emoji']
  )
  input.preProcessedOutput.metadata.freq = freq
  return {
    ...input.preProcessedOutput,
    data
  }
}

const staticSampleData: Media = {
  photos: [
    {
      caption: 'The new house',
      taken_at: '2020-12-01T19:48:10+00:00',
      path: 'photos/202012/q9p87324yhlakjskdjf.jpg'
    }
  ],
  profile: [
    {
      caption: '',
      is_active_profile: false,
      path: 'profile/202010/apsduihfpqa9uwfh.jpg',
      taken_at: '2020-10-01T15:30:42+00:00'
    }
  ],
  stories: [
    {
      caption: 'This is what I did today',
      path: 'stories/202011/08761234a956c796ed987ff.mp4',
      taken_at: '2020-11-13T18:55:08+00:00'
    }
  ],
  videos: [
    {
      caption: 'So fast!',
      path: 'videos/202012/098274e087f097ac7.mp4',
      taken_at: '2020-12-05T08:34:01+00:00'
    }
  ]
}

const generateRandomDateString = (date?: Date): DateString => {
  date ??= RandDate()
  return <DateString>formatDateEurTimeWithTz(date)
}

const generatePath = <
  TopLevelDirectory extends string,
  FileExtension extends string = 'mp4' | 'jpg'
>(
  topLevelDirectory: TopLevelDirectory,
  fileExtension: FileExtension,
  date?: Date
): PathString<TopLevelDirectory, FileExtension> => {
  date ??= RandDate()
  return `${topLevelDirectory}/${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${RandHex(32)}.${fileExtension}`
}

export const generateSampleMediaData = ({
  photos = 10,
  videos = 2,
  stories = 2,
  profiles = 2
}): Media => {
  return {
    profile: repeat(profiles, (i) => {
      const date = RandDate()
      return {
        is_active_profile: i === 0,
        taken_at: generateRandomDateString(date),
        caption: '',
        path: generatePath('profile', 'jpg', date)
      }
    }),
    stories: repeat(stories, (i) => {
      const date = RandDate()
      return {
        taken_at: generateRandomDateString(date),
        caption: i % 2 == 0 ? generateCaption() : '',
        path: generatePath('stories', 'jpg', date)
      }
    }),
    videos: repeat(videos, () => {
      const date = RandDate()
      return {
        taken_at: generateRandomDateString(date),
        caption: generateCaption(),
        path: generatePath('videos', 'mp4', date)
      }
    }),
    photos: repeat(photos, () => {
      const date = RandDate()
      return {
        taken_at: generateRandomDateString(date),
        caption: generateCaption(),
        path: generatePath('photos', 'jpg', date)
      }
    })
  }
}
