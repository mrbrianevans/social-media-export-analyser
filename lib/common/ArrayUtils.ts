// from 30 seconds of code
export const arrayEqualsPreserveOrder = (a: any[], b: any[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

export const arrayEquals = (a: any[], b: any[]) =>
  arrayEqualsPreserveOrder(a.sort(), b.sort())

export const objectKeysEqual = (a: Record<string, unknown>, b: string[]) => {
  return arrayEquals(Object.keys(a), b)
}

/**
 * Checks if an object has at least all the specific keys. Could have more.
 * @param a - the object to check the keys of.
 * @param b - the list of keys the object must include. string array.
 * @returns if the object has all the keys in the array.
 */
export const objectKeysInclude = (a: Record<string, unknown>, b?: string[]) => {
  return b?.every((k) => Object.keys(a).includes(k)) ?? false
}

/**
 * Array agnostic version of `objectKeysInclude`.
 *
 * Checks if the keys of an object are a superset of a list, or if the object is an
 * array, it checks the first 5 items.
 *
 * @example
 * ```ts
 * keysInclude({name:'Sam'}, ['name']) // true
 * keysInclude([{age:30}, {age:31, name: 'Sam'}], ['age']) // true
 * ```
 * @param obj - the object/array to check.
 * @param keys - the list of keys each object must include. string array.
 */
export const keysInclude = (obj, keys) => {
  let items = [obj]
  if (obj instanceof Array) {
    items = obj.slice(0, 5)
  }
  return items.every((i) => objectKeysInclude(i, keys))
}

/**
 * Calculates the maximum depth of an object by traversing every path.
 * Can be expensive on large objects, so use sparingly.
 * @param obj - the object to calculate depth of
 * @param maxDepthReached - a starting value, used for recursion. not recommended
 */
export const objectDepth = (obj: any, maxDepthReached = 0) => {
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

/**
 * Get the depth of an object, or if its an array then the depth of the items.
 * @param obj - the object or array to get depth of.
 */
export const objectOrArrayDepth = (obj) => {
  return objectDepth(obj) - (obj instanceof Array ? 1 : 0)
}
