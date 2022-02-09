import winkNLP from 'wink-nlp'
import model from 'wink-eng-lite-web-model'

const nlp = winkNLP(model)
const { its, as } = nlp

export type FrequencyTables<Tokens extends string = string> = {
  // tokenName can be something like "words", "hashtags" or "emojis"
  [tokenName in Tokens]?: {
    [tokenValue: string]: number // where number is the count of occurrances of tokenValue
  }
}
type TagCategory =
  | 'currency'
  | 'email'
  | 'emoji'
  | 'emoticon'
  | 'hashtag'
  | 'number'
  | 'ordinal'
  | 'punctuation'
  | 'quoted_phrase'
  | 'symbol'
  | 'time'
  | 'mention'
  | 'url'
  | 'word'

/**
 * Generate frequency tables for an array of strings.
 *
 * It counts the number of each token in the strings. This can be the number of
 * occurrences of a particular word, or emoji, or email address etc.
 * See {@link TagCategory} for full list of tokens.
 *
 * @param documents - string array of documents to count tokens in. Can have a single item.
 * @param limit - limit to the top X occurring tokens. Set to null for unlimited.
 * @param _categories - a list of categories to count tokens for. Eg words, emojis.
 * @param wordPosWhiteList - parts of speech to allow in word count. Default NOUN.
 * @returns an object where the top level keys are the names of the token
 * categories, and the values are objects mapping token =\> count.
 * @example
 * ```ts
 * getFrequencyTables(['Hello', 'world!'])
 * returns { word: { world: 1 } }
 * ```
 */
export function getFrequencyTables(
  documents: string[],
  limit = 50,
  _categories: TagCategory[] = ['word', 'url', 'emoji', 'hashtag', 'mention'],
  wordPosWhiteList = ['NOUN']
): FrequencyTables<typeof _categories[number]> {
  const categories = new Set(_categories)
  // console.log({ categories })
  const frequencyTables: FrequencyTables = Object.fromEntries(
    Array.from(categories).map((c) => [c, {}])
  )
  const doc = nlp.readDoc(documents.join('. ')) // join documents with periods

  for (const category of categories) {
    console.time(category + ' frequency')
    frequencyTables[category] = Object.fromEntries(
      doc
        .tokens()
        .filter((t) => t.out(its.type) === category)
        .out(its.normal, as.freqTable)
        .slice(0, limit ?? undefined)
        .map((e) => e as [token: string, freq: number][]) // fix typing
    )

    console.timeEnd(category + ' frequency')
  }

  // special treatment of word frequency to other categories. Only return NOUNS
  if (categories.has('word')) {
    const whiteList = new Set(wordPosWhiteList)
    const blackList = new Set(['PUNCT', 'SPACE', 'PART'])
    console.time('Word frequency')
    frequencyTables.word = Object.fromEntries(
      doc
        .tokens()
        // .filter((t) => !blackList.has(t.out(its.pos))) // remove blacklisted POS's
        .filter((t) => whiteList.has(t.out(its.pos))) // limit to white listed POS's
        .filter((t) => !t.out(its.stopWordFlag)) // get rid of stop words
        .filter((t) => !t.out(its.contractionFlag)) // get rid of contractions
        .out(its.normal, as.freqTable)
        .slice(0, limit ?? undefined)
        .map((e) => e as [token: string, freq: number][]) // fix typing
    )

    console.timeEnd('Word frequency')
  }
  return frequencyTables
}
