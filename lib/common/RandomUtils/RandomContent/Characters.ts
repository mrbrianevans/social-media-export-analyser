import { range } from '../../ArrayUtils'

export const AlphabetCharacters = Array.from(
  { length: 26 },
  (n, i) => i + 97
).map((c) => String.fromCodePoint(c))
export const AlphaNumericCharacters = AlphabetCharacters.concat(
  range(10).map((n) => n.toString())
)
export const HexCharacters = range(16).map((n) => n.toString(16))
