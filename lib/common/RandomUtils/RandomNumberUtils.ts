// inclusive of max and min
const RandIntMinMax = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min)
}

export const RandHex = (digits: number): string => {
  const max = 16 ** digits
  const min = 16 ** (digits - 1)
  const int = RandInt(min, max)
  return int.toString(16)
}

const RandIntLen = (length: number) => {
  return RandIntMinMax(10 ** (length - 1), 10 ** length - 1)
}

/**
 * Return a random integer between a range of minimum and maximum.
 * @param min - minimum value the integer can take
 * @param max - maximum value the integer can take
 */
export function RandInt(min: number, max: number)
/**
 * Generate an integer with a certain number of digits, specified by length.
 * @param length - number of digits in generated integer
 */
export function RandInt(length: number)
// random integer, either between min and max, or of size len digits
export function RandInt(minOrLen: number, max?: number): number {
  if (typeof max === 'number') return RandIntMinMax(minOrLen, max)
  else return RandIntLen(minOrLen)
}
