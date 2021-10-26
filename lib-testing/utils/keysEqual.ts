import { arrayEquals } from '../../lib/common/ArrayUtils'

export const keysEqual = (obj: { [key: string]: any }, keys: string[]) => {
  const objKeys = Object.keys(obj)
  return arrayEquals(objKeys, keys)
}

export const hasKeys = (obj: { [key: string]: any }, keys: string[]) => {
  const objKeys = Object.keys(obj)
  return keys.every((key) => objKeys.includes(key))
}

export const arrayItemsKeysEqual = (
  objArray: { [key: string]: any }[],
  keys: string[]
) => {
  return objArray.every((obj) => keysEqual(obj, keys))
}
