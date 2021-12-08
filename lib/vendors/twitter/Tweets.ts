import { DateFormatter } from '../../common/DateUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateCaption } from '../../common/RandomUtils/RandomContent/RandomSentence'
import { RandInt } from '../../common/RandomUtils/RandomNumberUtils'
import { RandElem } from '../../common/RandomUtils/RandomArrayUtils'

type QuotedNumber = `${number}`

type CharRange = [QuotedNumber, QuotedNumber]

interface Media {
  expanded_url: string
  source_status_id?: QuotedNumber
  source_user_id?: QuotedNumber
  source_user_id_str?: QuotedNumber
  source_status_id_str?: QuotedNumber
  indices: CharRange
  url: string
  media_url: string
  id_str: QuotedNumber
  id: QuotedNumber
  media_url_https: string
  video_info?: {
    aspect_ratio: CharRange
    variants: [
      {
        bitrate: QuotedNumber
        content_type: 'video/mp4'
        url: string
      }
    ]
  }
  sizes: {
    thumb: {
      w: QuotedNumber
      h: QuotedNumber
      resize: 'fit' | 'crop'
    }
    small: {
      w: QuotedNumber
      h: QuotedNumber
      resize: 'fit' | 'crop'
    }
    medium: {
      w: QuotedNumber
      h: QuotedNumber
      resize: 'fit' | 'crop'
    }
    large: {
      w: QuotedNumber
      h: QuotedNumber
      resize: 'fit' | 'crop'
    }
  }
  type: 'photo' | 'animated_gif'
  display_url: string
}

interface Hashtag {
  text: string
  indices: CharRange
}

// stock market ticker
interface TickerSymbol {
  text: string
  indices: CharRange
}

interface UserMention {
  name: string
  screen_name: string
  indices: CharRange
  id_str: QuotedNumber
  id: QuotedNumber
}

interface Url {
  // t.co shortened url
  url: string
  expanded_url: string
  display_url: string
  indices: CharRange
}
export type TweetEntity = Media | Hashtag | TickerSymbol | UserMention | Url
export interface Tweet {
  retweeted: boolean
  source: string
  entities: {
    hashtags: Hashtag[]
    symbols: TickerSymbol[]
    user_mentions: UserMention[]
    urls: Url[]
    media?: Media[]
  }
  display_text_range: CharRange
  favorite_count: QuotedNumber
  id_str: QuotedNumber
  truncated: false
  retweet_count: QuotedNumber
  id: QuotedNumber
  // eg "Tue Jun 09 09:17:48 +0000 2020"
  created_at: string
  favorited: boolean
  full_text: string
  lang: string
  in_reply_to_status_id_str?: QuotedNumber
  in_reply_to_user_id?: QuotedNumber
  in_reply_to_status_id?: QuotedNumber
  in_reply_to_screen_name?: string
  in_reply_to_user_id_str?: QuotedNumber
  possibly_sensitive?: boolean
  extended_entities?: { media: Media[] }
}

// returns date formatted like Tue Jun 09 09:17:48 +0000 2020
const formatDate: DateFormatter = (date) => {
  const datePart = date.toDateString()
  const year = datePart.slice(-4)
  const dayPart = datePart.slice(0, -5)
  const time = Intl.DateTimeFormat('en', {
    timeStyle: 'medium',
    hour12: false
  }).format(date)
  const timezoneHour = Math.floor(date.getTimezoneOffset() / 60)
  const timezoneHours = Math.abs(timezoneHour).toString().padStart(2, '0')
  const timezoneSign = date.getTimezoneOffset() > 0 ? '+' : '-'
  const timezoneMinute = Math.abs(date.getTimezoneOffset() - 60 * timezoneHour)
    .toString()
    .padStart(2, '0')
  return `${dayPart} ${time} ${timezoneSign}${timezoneHours}${timezoneMinute} ${year}`
}

const sources = [
  '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
  '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>'
]
export const generateTwitterTweets = ({ qty = 10 }): Tweet[] => {
  return Array(qty)
    .fill(null)
    .map((e, i): Tweet => {
      const full_text = generateCaption(10, 20).slice(0, 240)
      const id: QuotedNumber = `${RandInt(1_000_000, 1_000_000_000)}`
      return {
        created_at: formatDate(RandDate(10, 20)),
        display_text_range: ['0', `${full_text.length}`],
        entities: { hashtags: [], symbols: [], urls: [], user_mentions: [] },
        favorite_count: `${RandInt(0, 3)}`,
        favorited: false,
        full_text,
        id,
        id_str: id,
        lang: 'en',
        retweet_count: `${RandInt(0, 3)}`,
        retweeted: false,
        source: RandElem(sources),
        truncated: false
      }
    })
}

export const generateTwitterTweetFile = ({ qty }: { qty?: number }) => {
  const tweets = generateTwitterTweets({ qty })
  return `
  window.YTD.tweet.part0 = ${JSON.stringify(tweets, null, 2)}
  `
}
