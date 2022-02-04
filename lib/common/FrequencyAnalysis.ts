import winkNLP from '../wink-nlp.js'
import model from '../wink-eng-lite-web-model.js'
const nlp = winkNLP(model)
const { its, as } = nlp

export interface FrequencyTables {
  [tokenName: string]: {
    // tokenName can be something like "words", "hashtags" or "emojis"
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
export function getFrequencyTables(
  documents: string[],
  limit = 50,
  _categories: TagCategory[] = ['word', 'url', 'emoji', 'hashtag', 'mention'],
  wordPosWhiteList = ['NOUN']
): FrequencyTables {
  const categories = new Set(_categories)
  console.log({ categories })
  const frequencyTables: FrequencyTables = Object.fromEntries(
    Array.from(categories).map((c) => [c, {}])
  )
  console.log(frequencyTables)
  const doc = nlp.readDoc(documents.join('. ')) // join documents with periods

  for (const category of categories) {
    console.time(category + ' frequency')
    frequencyTables[category] = Object.fromEntries(
      doc
        .tokens()
        .filter((t) => t.out(its.type) === category)
        .out(its.normal, as.freqTable)
        .slice(0, limit)
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
        .slice(0, limit)
        .map((e) => e as [token: string, freq: number][]) // fix typing
    )

    console.timeEnd('Word frequency')
  }
  return frequencyTables
}
