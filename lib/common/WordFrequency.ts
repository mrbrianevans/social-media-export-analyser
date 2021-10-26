export const calculateWordFrequency = (content: string[]) => {
  // @ts-ignore
  console.time('Calculate word frequency')
  const words = content
    .flatMap((m) => m.split(' '))
    .map((word) => word.replace(/'/, '').toLowerCase())
  const wordFrequency = Object.fromEntries(words.map((w) => [w, 0]))
  words.forEach((w) => wordFrequency[w]++)
  const result = Object.entries(wordFrequency).map(([word, frequency]) => ({
    word,
    frequency
  }))
  result.sort((a, b) => b.frequency - a.frequency)
  // @ts-ignore
  console.timeEnd('Calculate word frequency')
  // @ts-ignore
  console.log(result.slice(0, 120).map((w) => w.word))
}
