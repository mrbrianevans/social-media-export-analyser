// inclusive of max and min
export const RandInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

export const RandHex = (digits: number): string => {
  const max = 16 ** digits
  const min = 16 ** (digits - 1)
  const int = RandInt(min, max)
  return int.toString(16)
}
