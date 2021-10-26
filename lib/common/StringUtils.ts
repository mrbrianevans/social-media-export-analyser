export const capitiliseEveryWord = (n) =>
  n.toLowerCase().replace(/\b[a-z]/g, (char) => char.toUpperCase())

export const capitilise = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export const capitiliseSentence = (sentence) =>
  sentence.replace(/^[a-z]|\. *[a-z]/g, (char) => char.toUpperCase())
