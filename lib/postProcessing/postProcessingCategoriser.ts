import { PostProcess, PostProcessedFileInput } from '../typedefs/PostProcess'
import { arrayEquals, objectDepth, objectKeysEqual } from '../common/ArrayUtils'
import { WhatsAppPostProcess } from './postProcessors/whatsappMessages'
import { TelegramPostProcess } from './postProcessors/telegramMessages'
import {
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
  NestedKeyValuePostProcess
} from './postProcessors/genericFallbacks/keyValue'
import { FileType } from '../typedefs/FileTypes'
import { DefaultPostProcess } from './postProcessors/genericFallbacks/default'
import { TabularDataPostProcess } from './postProcessors/genericFallbacks/tabularData'

type PostProcessorCategory = keyof typeof postProcessors | 'DefaultPostProcess'
// order is important. the first one in this array that matches is used
const postProcessors = {
  WhatsAppPostProcess,
  TelegramPostProcess,
  InstagramPostsPostProcess,
  InstagramProfilePostProcess,
  InstagramLikesPostProcess,
  TwitterProfilePostProcess,
  TwitterTweetsPostProcess,
  TwitterFallbackPostProcess,
  TwitterManifestPostProcess,
  TextPostProcess,
  ContactsCsvPostProcess,
  TabularDataPostProcess,
  KeyValuePostProcess,
  NestedKeyValuePostProcess,
  DefaultPostProcess
}

/**
 * Pick the best fitting post processing category based on characteristics of
 * a file and its data.
 * @param file the file after preprocessing.
 * @return category as a string. Get the processor with `getPostProcessByCode()`
 */
export const postProcessingCategoriser = (
  file: PostProcessedFileInput
): PostProcessorCategory => {
  const matchingCategory = (<[PostProcessorCategory, PostProcess][]>(
    Object.entries(postProcessors)
  )).find(([, processor]) => {
    const tester = processor.classifier
    return (
      tester.filenameRegex.test(file.filename) &&
      (tester.fileTypes === undefined ||
        tester.fileTypes.includes(<FileType>file.fileType)) &&
      (tester.itemCriteria?.keys === undefined ||
        objectKeysEqual(
          file.preProcessedOutput.data,
          tester.itemCriteria.keys
        )) &&
      tester.topLevelIsArray ===
        file.preProcessedOutput.data instanceof Array &&
      (tester.preProcessingCategory === undefined ||
        tester.preProcessingCategory === file.preProcessingCategory) &&
      (tester.itemCriteria?.maxDepth === undefined ||
        (tester.topLevelIsArray
          ? file.preProcessedOutput.data
              .slice(0, 5)
              .reduce((prev, curr) => Math.max(prev, objectDepth(curr)), 0)
          : objectDepth(file.preProcessedOutput.data)) <=
          tester.itemCriteria.maxDepth) &&
      (tester.itemCriteria?.minDepth === undefined ||
        (tester.topLevelIsArray
          ? file.preProcessedOutput.data
              .slice(0, 5)
              .reduce((prev, curr) => Math.max(prev, objectDepth(curr)), 0)
          : objectDepth(file.preProcessedOutput.data)) <=
          tester.itemCriteria.minDepth)
    )
  })?.[0]
  return matchingCategory ?? 'DefaultPostProcess'
}

export function getPostProcessByCode(code: PostProcessorCategory): PostProcess {
  return postProcessors[code]
}
