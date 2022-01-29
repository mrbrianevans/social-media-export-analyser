import { getTopics, initialiseWasm } from 'fast-topics'

initialiseWasm()

export async function runTest() {
  console.log('Hello testing 123')
  // documents from wikipedia
  const res = getTopics([
    'The stone or stone weight (abbreviation: st.)[1] is an English and imperial unit of mass equal to 14 pounds (approximately 6.35 kg)',
    'Utwe (or Utwa) is the second-largest municipality in the Micronesian state of Kosrae, the largest being Tafunsak',
    "It is a pink animal with a duck's lower body and a pig's head",
    'Pope Anianus was the 2nd Patriarch of Alexandria. He was ordained by Saint Mark the Evangelist, and was also the first convert Mark won to Christianity in the region',
    'American architect practicing in the city of Brockton, Massachusetts and its suburbs',
    'It was the 17th edition of the tournament which was part of the 2012 ATP Challenger Tour. It took place in Brașov, Romania between 3 and 9 September 2012'
    ])

  const pre = document.createElement('pre')
  pre.innerText = JSON.stringify(res, null, 2)
  document.querySelector('body').appendChild(pre)
}
