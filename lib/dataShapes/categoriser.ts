import { DataShape } from '../typedefs/DataShapes'

/**
 * This is to pass some unknown data into and find out what shape the data is in
 * @param data any data from a user uploaded file
 * @param filename the filename of the uploaded file
 */
export const categoriser = (data: any, filename: string): DataShape => {
  if (typeof data !== 'object') {
    return 'string'
  }
  return shapeTesters.find(testDataForShape(data, filename)).category
}

function getTopLevelKeys(data: Object) {
  if (data instanceof Array) return []
  return Object.keys(data)
}

const testDataForShape =
  (data: Object, filename: string) =>
  (shapeTester: ShapeTester): boolean => {
    if (data instanceof Array !== shapeTester.isArray) {
      return false
    }

    const topLevelKeys = getTopLevelKeys(data)
    if (shapeTester.topLevelKeys && topLevelKeys === shapeTester.topLevelKeys)
      return true

    return shapeTester.filenameRegex?.test(filename)
  }

type ShapeTester = {
  filenameRegex?: RegExp
  category: DataShape
  topLevelKeys?: string[]
  isArray: boolean
}

const shapeTesters: ShapeTester[] = [
  {
    filenameRegex: /.txt$/,
    category: 'messages',
    isArray: false
  }
]
