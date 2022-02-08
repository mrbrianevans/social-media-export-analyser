import { DateFormatter, formatDateEur } from './DateUtils'

interface TimeSeriesValue {
  timestamp: Date
  value: number
}

type TimeSeriesData = (
  | {
      timestamp: number | Date
      value?: number
    }
  | Date
  | number
)[]

type GroupResult<Key extends string | number = string> = Record<Key, number>

export class TimeSeries {
  data: TimeSeriesValue[]
  start: Date
  end: Date
  formatMonth: DateFormatter = defaultFormatMonth
  formatWeek: DateFormatter = defaultFormatWeek
  formatDay: DateFormatter = defaultFormatDay
  defaultValue = 1

  constructor(data: TimeSeriesData, defaultValue: number) {
    if (typeof defaultValue == 'number') this.defaultValue = defaultValue
    if (data.length === 0) this.data = []
    else {
      // get input dates into uniform structure
      for (const dataPoint of data) {
        if (dataPoint instanceof Date || typeof dataPoint === 'number')
          this.data.push({ timestamp: new Date(dataPoint), value: 1 })
        else if (typeof dataPoint === 'object')
          this.data.push({
            timestamp: new Date(dataPoint.timestamp),
            value: dataPoint.value ?? this.defaultValue
          })
      }
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
const defaultFormatMonth: DateFormatter = (date: Date) => {
  return formatDateEur(getNearestDay(date, 30))
}
const defaultFormatWeek: DateFormatter = (date: Date) => {
  return formatDateEur(getNearestDay(date, 7))
}
