import { DateFormatter, formatDateEur } from './DateUtils'

interface TimeSeriesValue {
  timestamp: Date
  value: number
}
// cannot read dates like 31/01/2022
type TimeSeriesData = (
  | {
      timestamp: number | Date | string
      value?: number
    }
  | Date
  | number
  | string
)[]

type GroupResult<Key extends string | number = string> = Record<Key, number>

export interface TimeSeriesMetadata {
  date: GroupResult
  week: GroupResult
  month: GroupResult
  monthName: GroupResult
  year: GroupResult
  weekday: GroupResult
  metadata: Record<string, string>
}

export class TimeSeries {
  readonly data: TimeSeriesValue[] = []
  readonly start: Date
  readonly end: Date
  private formatMonth: DateFormatter = formatMonthYear
  private formatWeek: DateFormatter = defaultFormatWeek
  private formatDay: DateFormatter = defaultFormatDay
  private readonly defaultValue: number
  private readonly label: string

  constructor(data: TimeSeriesData, label = 'Usage', defaultValue = 1) {
    this.label = label
    if (typeof defaultValue == 'number') this.defaultValue = defaultValue
    for (const dataPoint of data) {
      let timestamp, value
      if (dataPoint instanceof Date || typeof dataPoint === 'number') {
        timestamp = new Date(dataPoint)
        value = defaultValue
      } else if (typeof dataPoint === 'string') {
        timestamp = new Date(dataPoint.replace('BST', '(British Summer Time)'))
        value = defaultValue
      } else if (typeof dataPoint === 'object') {
        timestamp = new Date(dataPoint.timestamp)
        value = dataPoint.value ?? this.defaultValue
      }
      // only push real dates into the dataset
      if (!isNaN(timestamp.getTime())) this.data.push({ timestamp, value })
      else console.log('Invalid date:', dataPoint)
    }
    // this could be replaced by a util function "arrayMin"
    let earliestTimestamp = Infinity
    let latestTimestamp = -Infinity
    for (const datum of this.data) {
      if (datum.timestamp.getTime() < earliestTimestamp)
        earliestTimestamp = datum.timestamp.getTime()
      if (datum.timestamp.getTime() > latestTimestamp)
        latestTimestamp = datum.timestamp.getTime()
    }
    this.start = new Date(earliestTimestamp)
    this.end = new Date(latestTimestamp)
  }

  groupByWeek(): GroupResult {
    return this.groupByFormatter(this.formatWeek)
  }

  groupByMonth(): GroupResult {
    return this.groupByFormatter(this.formatMonth)
  }

  groupByMonthName(): GroupResult {
    return this.groupByFormatter(formatMonthName)
  }

  groupByDay(): GroupResult {
    return this.groupByFormatter(this.formatDay)
  }

  groupByXDays(x: number): GroupResult {
    const formatter: DateFormatter = (date) =>
      this.formatDay(getNearestDay(date, x * 86400 * 1000))
    return this.groupByFormatter(formatter)
  }

  groupByFormatter(formatter: DateFormatter): GroupResult {
    if (!this.data.length) return {}
    const bins = {}
    for (const datum of this.data) {
      const day = formatter(datum.timestamp)
      if (day in bins) bins[day] += datum.value
      else bins[day] = datum.value
    }
    return bins
  }

  groupByYear() {
    return this.groupByFormatter((d) => d.getFullYear().toString())
  }

  groupByDayOfWeek() {
    return this.groupByFormatter(formatDayOfWeek)
  }

  get [Symbol.toStringTag](): string {
    return 'TimeSeries'
  }

  get metadata(): TimeSeriesMetadata {
    const metadata = {
      date: this.groupByDay(),
      weekday: this.groupByDayOfWeek(),
      week: this.groupByWeek(),
      month: this.groupByMonth(),
      monthName: this.groupByMonthName(),
      year: this.groupByYear(),
      metadata: {
        label: this.label,
        start: this.start.toISOString(),
        end: this.end.toISOString()
      }
    }
    return metadata
  }
}

/**
 * Get the nearest previous date which is a multiple of `to` days.
 *
 * @param date - the date of the data point
 * @param to - the multiple to round down to. Eg 3 for every third day.
 */
const getNearestDay = (date: Date, to: number) =>
  new Date(date.getTime() - (date.getTime() % (to * 86400 * 1000)))

const defaultFormatDay: DateFormatter = (date: Date) => {
  return formatDateEur(date)
}
// returns the Monday of the week date is in
const defaultFormatWeek: DateFormatter = (date: Date) => {
  date.setDate(date.getDate() - date.getDay() + 1)
  return formatDateEur(date)
}
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
const formatDayOfWeek: DateFormatter = (date) => {
  return days[date.getDay()]
}
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const formatMonthName: DateFormatter = (date) => {
  return months[date.getMonth()]
}

const formatMonthYear: DateFormatter = (date: Date) => {
  return months[date.getMonth()] + ' ' + date.getFullYear()
}
