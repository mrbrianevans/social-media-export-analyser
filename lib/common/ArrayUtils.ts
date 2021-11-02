// from 30 seconds of code
export const arrayEqualsPreserveOrder = (a: any[], b: any[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

export const arrayEquals = (a: any[], b: any[]) =>
  arrayEqualsPreserveOrder(a.sort(), b.sort())

export const objectKeysEqual = (a: {}, b: string[]) => {
  return arrayEquals(Object.keys(a), b)
}

export const objectKeysInclude = (a: {}, b: string[]) => {
  return b.every((k) => Object.keys(a).includes(k))
}

/**
 * Calculates the maximum depth of an object by traversing every path.
 * Can be expensive on large objects, so use sparingly.
 * @param obj
 * @param maxDepthReached
 */
export const objectDepth = (obj: {}, maxDepthReached = 0) => {
  if (typeof obj === 'object') {
    let highest = maxDepthReached++
    if (obj instanceof Array) obj = obj.slice(0, 5)
    for (const [key, value] of Object.entries(obj)) {
      highest = Math.max(objectDepth(value, maxDepthReached), highest)
    }
    return highest
  } else {
    return maxDepthReached
  }
}
