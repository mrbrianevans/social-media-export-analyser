import { RandInt } from '../RandomNumberUtils'
import { RandElem } from '../RandomArrayUtils'
import { captionWords, textMessageWords } from './RandomWords'
import { capitiliseSentence } from '../../StringUtils'
import { Emojis } from './RandomEmojis'

export const generateCaption = (
  minLength = 10,
  maxLength = minLength
): string => {
  return generateSentence(minLength, maxLength, captionWords) + RandElem(Emojis)
}

export const generateTextMessage = (
  minLength = 10,
  maxLength = minLength
): string => {
  return generateSentence(minLength, maxLength, textMessageWords)
}

export const generateSentence = (
  minLength = 10,
  maxLength = minLength,
  words: string[]
): string => {
  const length = RandInt(minLength, maxLength)
  const sentence = Array(length)
    .fill('')
    .map(() => RandElem(words))
    .join(' ')
  return capitiliseSentence(sentence)
}
