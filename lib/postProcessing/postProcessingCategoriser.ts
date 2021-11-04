import { PostProcess, PostProcessedFileInput } from '../typedefs/PostProcess'
import {
  arrayEquals,
  keysInclude,
  objectDepth,
  objectKeysEqual,
  objectKeysInclude,
  objectOrArrayDepth
} from '../common/ArrayUtils'
import { WhatsAppPostProcess } from './postProcessors/whatsappMessages'
import { TelegramPostProcess } from './postProcessors/telegramMessages'
import {
  InstagramConnectionsPostProcess,
  InstagramLikesPostProcess,
  InstagramPostsPostProcess,
  InstagramProfilePostProcess
} from './postProcessors/instagram'
import {
  TwitterFallbackPostProcess,
  TwitterManifestPostProcess,
  TwitterProfilePostProcess,
  TwitterTweetsPostProcess
} from './postProcessors/twitter'
import { TextPostProcess } from './postProcessors/genericFallbacks/text'
import { ContactsCsvPostProcess } from './postProcessors/contacts'
import {
  KeyValuePostProcess,
  NestedArrayPostProcess,
  NestedKeyValuePostProcess
} from './postProcessors/genericFallbacks/keyValue'
import { FileType } from '../typedefs/FileTypes'
import { DefaultPostProcess } from './postProcessors/genericFallbacks/default'
import { TabularDataPostProcess } from './postProcessors/genericFallbacks/tabularData'

type PostProcessorCategory =
  | keyof typeof postProcessors
  | keyof typeof genericPostProcessors
// order is important. the first one in this array that matches is used
const postProcessors = {
  WhatsAppPostProcess,
  TelegramPostProcess,
  InstagramPostsPostProcess,
  InstagramProfilePostProcess,
  InstagramConnectionsPostProcess,
  InstagramLikesPostProcess,
  TwitterProfilePostProcess,
  TwitterTweetsPostProcess,
  TwitterFallbackPostProcess,
  TwitterManifestPostProcess,
  ContactsCsvPostProcess,
  TextPostProcess
}
const genericPostProcessors = {
  TabularDataPostProcess,
  KeyValuePostProcess,
  NestedKeyValuePostProcess,
  NestedArrayPostProcess,
  DefaultPostProcess
}
/**
 * Pick the best fitting post processing category based on characteristics of
 * a file and its data.
 * @param file - the file after preprocessing.
 * @returns category - as a string. Get the processor with `getPostProcessByCode()`
 */
export const postProcessingCategoriser = (
  file: PostProcessedFileInput
): PostProcessorCategory => {
  const depth = objectOrArrayDepth(file.preProcessedOutput.data)
  let matchingCategory = (<[PostProcessorCategory, PostProcess][]>(
    Object.entries(postProcessors)
  )).find(([, processor]) => {
    const tester = processor.classifier
    return (
      tester.filenameRegex.test(file.filename) &&
      (tester.fileTypes === undefined ||
        file.fileType === '' ||
        tester.fileTypes.includes(<FileType>file.fileType)) &&
      (tester.preProcessingCategory === undefined ||
        tester.preProcessingCategory === file.preProcessingCategory)
    )
  })?.[0]
  // if can't find a perfectly matching one, try again but ignore filename/filetype
  matchingCategory ??= (<[PostProcessorCategory, PostProcess][]>(
    Object.entries(postProcessors)
  )).find(([, processor]) => {
    const tester = processor.classifier
    return (
      keysInclude(file.preProcessedOutput.data, tester.itemCriteria?.keys) &&
      tester.topLevelIsArray ===
        file.preProcessedOutput.data instanceof Array &&
      (tester.itemCriteria?.maxDepth === undefined ||
        depth <= tester.itemCriteria.maxDepth) &&
      (tester.itemCriteria?.minDepth === undefined ||
        depth >= tester.itemCriteria.minDepth)
    )
  })?.[0]
  // check the generics for object depth and array status
  matchingCategory ??= (<[PostProcessorCategory, PostProcess][]>(
    Object.entries(genericPostProcessors)
  )).find(([, processor]) => {
    const tester = processor.classifier
    return (
      tester.topLevelIsArray ===
        file.preProcessedOutput.data instanceof Array &&
      ((tester.itemCriteria?.maxDepth !== undefined &&
        depth <= tester.itemCriteria.maxDepth) ||
        (tester.itemCriteria?.minDepth !== undefined &&
          depth >= tester.itemCriteria.minDepth))
    )
  })?.[0]
  matchingCategory ??= 'DefaultPostProcess'
  return matchingCategory
}

export function getPostProcessByCode(code: PostProcessorCategory): PostProcess {
  return postProcessors[code] ?? genericPostProcessors[code]
}
