// order is important. the first one in this array that matches is used
import {
  PreProcessedFileInfo,
  PreProcessingCategory,
  PreProcessingTester
} from '../typedefs/PreProcess'

const preProcessingTesters: PreProcessingTester[] = [
  {
    filenameRegex: /^WhatsApp Chat with .*?\.txt$/,
    fileTypes: ['text/plain'],
    preProcessingCategory: 'whatsapp'
  },
  {
    filenameRegex: /\.json$/,
    fileTypes: ['application/json'],
    preProcessingCategory: 'json'
  },
  {
    filenameRegex: /\.csv$/,
    fileTypes: ['text/csv', 'application/vnd.ms-excel'],
    preProcessingCategory: 'csv'
  },
  {
    filenameRegex: /\.csv$/,
    fileTypes: ['text/csv', 'application/vnd.ms-excel'],
    preProcessingCategory: 'csv'
  }
]

export const preProcessingCategoriser = (
  file: PreProcessedFileInfo
): PreProcessingCategory => {
  return (
    preProcessingTesters.find(
      (tester) =>
        tester.filenameRegex.test(file.filename) &&
        tester.fileTypes.includes(file.fileType)
    ).preProcessingCategory ?? 'text'
  )
}
