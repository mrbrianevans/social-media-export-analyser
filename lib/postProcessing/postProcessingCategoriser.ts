// order is important. the first one in this array that matches is used
import {
  PostProcessedFileInput,
  PostProcessingCategory,
  PostProcessingTester
} from '../typedefs/PostProcess'
import { arrayEqualsPreserveOrder, arrayEquals } from '../common/ArrayUtils'
import { preProcessingCategoriser } from '../preProcessing/preProcessingCategoriser'

const postProcessingTesters: PostProcessingTester[] = [
  {
    filenameRegex: /^WhatsApp Chat with .*?\.txt$/,
    preProcessingCategory: 'whatsapp',
    topLevelIsArray: true,
    postProcessingCategory: 'whatsapp-messages'
  },
  {
    filenameRegex: /^contacts\.csv$/,
    preProcessingCategory: 'csv',
    topLevelIsArray: true,
    postProcessingCategory: 'default-array'
  },
  {
    filenameRegex: /^result\.json$/,
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    postProcessingCategory: 'telegram-messages',
    topLevelKeys: ['name', 'type', 'id', 'messages']
  },
  {
    filenameRegex: /^media\.json$/,
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    postProcessingCategory: 'instagram-posts',
    topLevelKeys: ['photos', 'videos', 'stories', 'profile']
  },
  {
    filenameRegex: /^likes\.json$/,
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    postProcessingCategory: 'default-object',
    topLevelKeys: ['media_likes', 'comment_likes']
  },
  {
    filenameRegex: /.*/,
    preProcessingCategory: 'json',
    topLevelIsArray: false,
    postProcessingCategory: 'default-object'
  },
  {
    filenameRegex: /.*/,
    preProcessingCategory: 'json',
    topLevelIsArray: true,
    postProcessingCategory: 'default-array'
  },
  {
    filenameRegex: /.*/,
    preProcessingCategory: 'csv',
    topLevelIsArray: true,
    postProcessingCategory: 'default-array'
  },
  {
    filenameRegex: /.*/,
    preProcessingCategory: 'text',
    topLevelIsArray: false,
    topLevelKeys: ['text'],
    postProcessingCategory: 'text'
  },
  {
    filenameRegex: /^manifest.js$/,
    preProcessingCategory: 'twitterJs',
    topLevelIsArray: false,
    postProcessingCategory: 'default-object'
  },
  {
    filenameRegex: /.*/,
    preProcessingCategory: 'twitterJs',
    topLevelIsArray: true,
    postProcessingCategory: 'default-array'
  }
]

export const postProcessingCategoriser = (
  file: PostProcessedFileInput
): PostProcessingCategory => {
  const matchingCategory = postProcessingTesters.find(
    (tester) =>
      tester.filenameRegex.test(file.filename) &&
      (tester.fileTypes === undefined ||
        tester.fileTypes.includes(file.fileType)) &&
      (tester.topLevelKeys === undefined ||
        arrayEquals(
          tester.topLevelKeys,
          Object.keys(file.preProcessedOutput.data)
        )) &&
      tester.topLevelIsArray ===
        file.preProcessedOutput.data instanceof Array &&
      tester.preProcessingCategory === file.preProcessingCategory
  ).postProcessingCategory
  if (!matchingCategory) {
    // @ts-ignore
    console.log('failed to find category')
  } else {
    // @ts-ignore
    console.log('found', matchingCategory, 'as matching category')
  }
  return matchingCategory ?? 'default-object'
}
