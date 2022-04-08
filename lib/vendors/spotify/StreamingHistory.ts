import { range } from '../../common/ArrayUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { formatDateEur } from '../../common/DateUtils'
import { RandBoolean } from '../../common/RandomUtils/RandomBooleanUtils'
import { RandInt } from '../../common/RandomUtils/RandomNumberUtils'
import { generateRandomSong } from '../../common/RandomUtils/RandomContent/RandomSongs'

interface StreamingHistory {
  // in the format "2021-12-13 12:35"
  endTime: string
  artistName: string
  trackName: string
  msPlayed: number
}

function formatDate(date: Date): string {
  return (
    formatDateEur(date) +
    ' ' +
    Intl.DateTimeFormat('en', { timeStyle: 'short', hour12: false }).format(
      date
    )
  )
}

export function generateSpotifyStreamingHistory({
  qty = 10
}): StreamingHistory[] {
  return range(qty).map(() => {
    const song = generateRandomSong()
    return {
      endTime: formatDate(RandDate()),
      artistName: song.artist,
      trackName: song.title,
      msPlayed: RandBoolean() ? RandInt(200, 5000) : RandInt(150_000, 300_000)
    }
  })
}
