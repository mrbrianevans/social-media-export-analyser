import { TimeSeries } from '../../../lib/common/TimeSeriesAnalysis'
import Assert from 'assert-js'

describe('time series analysis of data', function () {
  it('should ingest a list of dates without errors', function () {
    const data = [
      new Date(1644394844660),
      new Date(1644094844660),
      new Date(1643794844660),
      new Date(1643594844660)
    ]
    const ts = new TimeSeries(data)
    Assert.equal(ts.data.length, data.length)
  })
  it('should ingest a list of millisecond timestamps without errors', function () {
    const data = [
      1644394844660, 1644294844660, 1644194844660, 1644094844660, 1643994844660
    ]
    const ts = new TimeSeries(data)
    Assert.equal(ts.data.length, data.length)
  })
  it('should ingest a list of date strings without errors', function () {
    const data = ['2022-02-09', '2022-02-08', '2022-02-07']
    const ts = new TimeSeries(data)
    Assert.equal(ts.data.length, data.length)
  })
  it('should ingest a list of millisecond timestamps without errors', function () {
    const data = [
      { timestamp: 1644394844660 },
      { timestamp: 1644094844660, value: 10 }
    ]
    const ts = new TimeSeries(data)
    Assert.equal(ts.data.length, data.length)
  })

  it('should group data by day', function () {
    const data = ['2022-02-07', '2022-02-07', '2022-02-08', '2022-02-09']
    const ts = new TimeSeries(data, undefined, 1)
    const grouped = ts.groupByDay()
    Assert.hasProperties(['2022-02-07', '2022-02-08', '2022-02-09'], grouped)
    Assert.equal(grouped['2022-02-07'], 2)
    Assert.equal(grouped['2022-02-08'], 1)
    Assert.equal(grouped['2022-02-09'], 1)
  })
  it('should group data by day with values', function () {
    const data = [
      { timestamp: '2022-02-07' },
      { timestamp: '2022-02-10', value: 10 }
    ]
    const ts = new TimeSeries(data, undefined, 1)
    const grouped = ts.groupByDay()
    Assert.hasProperties(['2022-02-07', '2022-02-10'], grouped)
    Assert.equal(grouped['2022-02-07'], 1)
    Assert.equal(grouped['2022-02-10'], 10)
  })
  it('should group data by month', function () {
    const data = ['2022-01-07', '2022-01-07', '2022-02-10', '2022-03-19']
    const ts = new TimeSeries(data, undefined, 1)
    const grouped = ts.groupByMonth()
    // first day of each month containing values
    Assert.hasProperties(
      ['January 2022', 'February 2022', 'March 2022'],
      grouped
    )
    Assert.equal(grouped['January 2022'], 2)
    Assert.equal(grouped['February 2022'], 1)
    Assert.equal(grouped['March 2022'], 1)
  })
  it('should group data by week', function () {
    const data = ['2022-01-07', '2022-01-08', '2022-01-10', '2022-01-19']
    const ts = new TimeSeries(data, undefined, 1)
    const grouped = ts.groupByWeek()
    // first day of each month containing values
    Assert.hasProperties(['2022-01-03', '2022-01-10', '2022-01-17'], grouped)
    Assert.equal(grouped['2022-01-03'], 2)
    Assert.equal(grouped['2022-01-10'], 1)
    Assert.equal(grouped['2022-01-17'], 1)
  })
})
