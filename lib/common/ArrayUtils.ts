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
 * Returns the top level keys of an object or an array of objects
 */
export const objectKeys = (
  obj: Record<string, any> | Record<string, any>[]
) => {
  if (typeof obj !== 'object' || obj === null)
    throw new Error('objectKeys called on non-object: ' + obj)
  if (obj instanceof Array) return objectKeys(obj[0])
  return Object.keys(obj)
}

/**
 * Returns the top level keys of the first `limit` objects in an array.
 * @param arr - the array of objects
 * @param limit - only check the first limit objects in the array to save time.
 *
 * Set limit to null to check every object in the array, regardless of length.
 */
export const arrayObjectKeys = (arr: Record<string, any>[], limit = 100) => {
  const keys = new Set<string>()
  for (const obj of arr.slice(0, limit ?? undefined)) {
    for (const objKey in obj) {
      keys.add(objKey)
    }
  }
  return Array.from(keys)
}

/**
 * Calculates the maximum depth of an object by traversing every path.
 * Can be expensive on large objects, so use sparingly.
 * @param obj - the object to calculate depth of
 * @param maxDepthReached - a starting value, used for recursion. not recommended
 */
export const objectDepth = (obj: any, maxDepthReached = 0) => {
  if (maxDepthReached > 7) return maxDepthReached // to prevent a call stack overflow
  if (typeof obj === 'object' && obj !== null) {
    let highest = maxDepthReached++
    if (obj instanceof Array) obj = obj.slice(0, 5)
    for (const value of Object.values(obj)) {
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

/**
 * If start === finish, it starts at zero up to finish.
 *
 * @example
 * ```ts
 range(10) // 0 - 10
 range(1,5) // 1 - 5
 range(0,10,2) // 0,2,4,6,8,10
```
*/
export const range = (start: number, finish = start, increment = 1) => {
  if (start === finish) start = 0
  const length = Math.floor((finish - start) / increment)
  return Array.from({ length }, (v, i) => i * increment + start)
}

export const repeat = <T = any>(
  qty: number,
  mapFn: (index: number) => T
): T[] => {
  return range(qty).map((v, i) => mapFn(i))
}

/**
 * Returns the number of primitives in an object
 */
export const objectSize = (object: any) => {
  if (typeof object !== 'object' || object === null) {
    return 1
  } else
    return Object.values(object).reduce(
      (total, current) => objectSize(current) + total,
      0
    )
}

/**
 * Initialise an object with an array of keys all set to an initial value.
 * @param keys - array of keys to populate object with.
 * @param value - value to assign to each of the keys in the object.
 */
export const initObject = (keys: string[], value: any = null) => {
  return Object.fromEntries(keys.map((key) => [key, value]))
}

/**
 * Find columns in tabular data which pass a certain test.
 * @param arr - array of objects. Tabular data. Each object is a "row" and each key is a "column".
 * @param test - a function which returns true or false for a given value.
 * @param threshold - the minimum cutoff percentage threshold of rows in a column to pass, for a column to pass the test. Defaults to 99%.
 * @param limit - the number of rows checked. Defaults to the first 100. Set to null to check all rows.
 */
export const findColumns = (
  arr: Record<string, any>[],
  test: (val: any) => boolean,
  threshold = 90,
  limit = 100
) => {
  const accLimit = Math.min(limit ?? arr.length, arr.length) // if the limit is higher than the number of items in the array, then its not the limiting factor.
  const rows = arr.slice(0, limit ?? undefined)
  const columns = arrayObjectKeys(arr, limit)
  const matchCounts = initObject(columns, 0)
  for (const row of rows) {
    for (const column of columns) {
      if (test(row[column])) matchCounts[column]++
    }
  }
  console.log(matchCounts)
  return Object.entries(matchCounts)
    .filter(
      ([column, count]) => Math.ceil((count / accLimit) * 100) >= threshold
    )
    .map(([column]) => column)
}

/**
 * Find the columns in tabular data which contain valid dates.
 * @param arr - tabular data. Each object is a row, each key is a column.
 * @param earliestDate - the earliest date timestamp allowed. Defaults to 20 years ago.
 * @param latestDate - latest date timestamp allowed. Defaults to current time.
 * @param threshold - the percentage of rows which must be valid dates for the row to be returned.
 * @param limit - the number of rows to check. Defaults to first 100.
 */
export const findDateColumns = (
  arr: Record<string, any>[],
  earliestDate: number = Date.now() - 1000 * 86400 * 365 * 20,
  latestDate = Date.now(),
  threshold = 90,
  limit = 100
) => {
  const test = (val) => {
    const date = Date.parse(val)
    const canBeParsed = !isNaN(date)
    const inRange = date < latestDate && date > earliestDate
    return canBeParsed && inRange
  }
  const dateKeys = findColumns(arr, test, threshold, limit)

  return dateKeys
}
