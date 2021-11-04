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
