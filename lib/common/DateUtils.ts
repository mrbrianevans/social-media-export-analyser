export function parseDate(date: any) {
  if (date instanceof Date || typeof date === 'number') return new Date(date)
  else if (typeof date === 'string')
    return new Date(date.replace('BST', '(British Summer Time)'))
  else
    throw new Error('Cannot parse date of type ' + typeof date + ' : ' + date)
}
export type DateFormatter = (date: Date) => string
// eg 2014-06-03T22:01:26
export const formatDateEurTime: DateFormatter = (date) => {
  const time = Intl.DateTimeFormat('en-GB', { timeStyle: 'medium' }).format(
    date
  ) // 20:39:22
  return `${formatDateEur(date)}T${time}`
}
// eg 2020-10-29T23:54:59+00:00
export const formatDateEurTimeWithTz: DateFormatter = (date) => {
  const hoursOffset = Math.floor(date.getTimezoneOffset() / 60)
  const minutesOffset = Math.abs(date.getTimezoneOffset() - hoursOffset * 60)
  const offsetDirection = hoursOffset < 0 ? '-' : '+'
  // return `${2020}-${11}-${4}T${19}:${55}:${55}+${00}:${00}`
  return `${formatDateEurTime(date)}${offsetDirection}${Math.abs(hoursOffset)
    .toString()
    .padStart(2, '0')}:${minutesOffset.toString().padStart(2, '0')}`
}
// returns yyyy-mm-dd date format european style
export const formatDateEur: DateFormatter = (
  date
): `${number}-${string}-${string}` => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export const longDateTime: DateFormatter = (date) => {
  return Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeStyle: 'medium'
  }).format(date)
}

export const longDate: DateFormatter = (date) => {
  return Intl.DateTimeFormat('en', {
    dateStyle: 'long'
  }).format(date)
}

/**
 * Finds the difference between two dates in milliseconds.
 */
export function millisecondDifference(d1: Date, d2: Date) {
  return parseDate(d1).getTime() - parseDate(d2).getTime()
}

/**
 * Finds the difference between two dates in seconds.
 */
export function secondDifference(d1: Date, d2: Date) {
  return millisecondDifference(d1, d2) / 1000
}

/**
 * Finds the difference between two dates in minutes.
 */
export function minuteDifference(d1: Date, d2: Date) {
  return secondDifference(d1, d2) / 60
}
