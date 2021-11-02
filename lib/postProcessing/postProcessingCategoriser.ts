import { PostProcess, PostProcessedFileInput } from '../typedefs/PostProcess'
import { arrayEquals } from '../common/ArrayUtils'
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
import { DefaultPostProcess } from './postProcessors/genericFallbacks/default'
import { FileType } from '../typedefs/FileTypes'

// order is important. the first one in this array that matches is used
const postProcessors: PostProcess[] = [
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
  KeyValuePostProcess,
  NestedKeyValuePostProcess
]

export const postProcessingCategoriser = (
  file: PostProcessedFileInput
): PostProcess => {
  const matchingCategory = postProcessors.find((processor) => {
    const tester = processor.classifier
    return (
      tester.filenameRegex.test(file.filename) &&
      (tester.fileTypes === undefined ||
        tester.fileTypes.includes(<FileType>file.fileType)) &&
      (tester.itemCriteria?.keys === undefined ||
        arrayEquals(
          tester.itemCriteria?.keys,
          Object.keys(file.preProcessedOutput.data)
        )) &&
      tester.topLevelIsArray ===
        file.preProcessedOutput.data instanceof Array &&
      tester.preProcessingCategory === file.preProcessingCategory
    )
  })
  return matchingCategory ?? DefaultPostProcess
}

export const getPostProcessByCode = (code: string) => {
  return postProcessors.find((p) => p.code === code)
}
