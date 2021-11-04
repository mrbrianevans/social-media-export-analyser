import { RandHex } from '../../common/RandomUtils/RandomNumberUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateCaption } from '../../common/RandomUtils/RandomContent/RandomSentence'
import {
  formatDateEurTime,
  formatDateEurTimeWithTz
} from '../../common/DateUtils'

type DateString =
  `${number}-${number}-${number}T${number}:${number}:${number}+${number}:${number}`
//2021-01-01T19:48:10+00:00
type PathString<
  topLevelDirectory extends string,
  fileExtension extends string = 'mp4' | 'jpg',
  year extends number = number,
  month extends number = number
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
  return `${topLevelDirectory}/${date.getFullYear()}${
    date.getMonth() + 1
  }/${RandHex(32)}.${fileExtension}`
}

export const generateSampleMediaData = ({
  photos = 10,
  videos = 2,
  stories = 2,
  profiles = 2
}): Media => {
  return {
    profile: [],
    stories: [],
    videos: [],
    photos: Array(photos)
      .fill(null)
      .map(() => {
        const date = RandDate()
        return {
          taken_at: generateRandomDateString(date),
          caption: generateCaption(),
          path: generatePath('photos', 'jpg', date)
        }
      })
  }
}
