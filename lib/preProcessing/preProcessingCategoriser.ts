// order is important. the first one in this array that matches is used
import {
  PreProcessedFileInfo,
  PreProcessingCategory,
  PreProcessingTester
} from '../typedefs/PreProcess'
import { CommonImageTypes, CommonVideoTypes } from '../common/isMedia'

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
    filenameRegex: /\.txt$/,
    fileTypes: ['text/plain'],
    preProcessingCategory: 'text'
  },
  {
    filenameRegex: /\.js$/,
    fileTypes: ['text/javascript', 'application/x-javascript'],
    preProcessingCategory: 'twitterJs'
  },
  {
    filenameRegex: /\.(jpe?g|png|svg|webp|apng|avif|gif|jfif|pjpeg|pjp)$/i,
    fileTypes: CommonImageTypes.map((t) => `image/${t}`),
    preProcessingCategory: 'image'
  },
  {
    filenameRegex: /\.(3pg|mpe?g|mp4|m4v|m4p|ogg|ogv|mov|webm)$/i,
    fileTypes: CommonVideoTypes.map((t) => `video/${t}`),
    preProcessingCategory: 'video'
  },
  {
    filenameRegex: /\.html$/,
    fileTypes: ['text/html'],
    preProcessingCategory: 'html'
  },
  {
    filenameRegex: /\.vcf$/,
    fileTypes: ['text/x-vcard'],
    preProcessingCategory: 'vcard'
  }
]

export const preProcessingCategoriser = (
  file: PreProcessedFileInfo
): PreProcessingCategory => {
  return (
    preProcessingTesters.find(
      (tester) =>
        tester.filenameRegex.test(file.filename) &&
        (file.fileType === '' || tester.fileTypes.includes(file.fileType))
    )?.preProcessingCategory ?? 'text'
  )
}
