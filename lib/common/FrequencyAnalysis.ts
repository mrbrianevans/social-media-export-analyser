import winkNLP, { Model } from 'wink-nlp'
import model from 'https://cdn.skypack.dev/wink-eng-lite-web-model'
const nlp = winkNLP(<Model>model)
const { its, as } = nlp

interface FrequencyTables {
  [tokenName: string]: {
    // tokenName can be something like "words", "hashtags" or "emojis"
    [tokenValue: string]: number // where number is the count of occurrances of tokenValue
  }
}
export function getFrequencyTables(
  documents: string[],
  limit = 50,
  _categories = ['url', 'emoji', 'hashtag', 'mentions']
): FrequencyTables {
  const categories = new Set(_categories)
  const frequencyTables: FrequencyTables = Object.fromEntries(
    Array.from(categories).map((c) => [c, {}])
  )
  const doc = nlp.readDoc(documents.join('. ')) // join documents with periods

  for (const category in categories) {
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
    const whiteList = new Set(['NOUN'])
    const blackList = new Set(['PUNCT', 'SPACE', 'PART'])
    console.time('Word frequency')
    frequencyTables.words = Object.fromEntries(
      doc
        .tokens()
        .filter((t) => !t.out(its.stopWordFlag)) // get rid of stop words
        .filter((t) => !t.out(its.contractionFlag)) // get rid of contractions
        .filter((t) => !blackList.has(t.out(its.pos))) // remove blacklisted POS's
        .filter((t) => whiteList.has(t.out(its.pos))) // limit to white listed POS's
        .out(its.normal, as.freqTable)
        .slice(0, limit)
        .map((e) => e as [token: string, freq: number][]) // fix typing
    )

    console.timeEnd('Word frequency')
  }
  return frequencyTables
}
