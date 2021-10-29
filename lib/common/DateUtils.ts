type DateFormatter = (date: Date) => string
// eg 2014-06-03T22:01:26
export const formatDateEurTime: DateFormatter = (date) => {
  const time = Intl.DateTimeFormat('en-GB', { timeStyle: 'medium' }).format(
    date
  ) // 20:39:22
  return `${formatDateEur(date)}T${time}`
}

// returns yyyy-mm-dd date format european style
export const formatDateEur: DateFormatter = (
  date
): `${number}-${string}-${string}` => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}
