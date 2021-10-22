import { PreProcessedOutput, PreProcessingCategory } from './PreProcess'

export type PostProcessingCategory =
  | 'default-object'
  | 'whatsapp-messages'
  | 'telegram-messages'
  | 'default-array'
  | 'instagram-posts'

export type PostProcessingTester = {
  // tests
  filenameRegex?: RegExp
  fileTypes?: string[]
  preProcessingCategory: PreProcessingCategory
  topLevelIsArray: boolean
  topLevelKeys?: string[]
  // classification
  postProcessingCategory: PostProcessingCategory
}
export type PostProcessedFileInput = {
  filename: string
  filepath?: string
  fileType: string
  preProcessedOutput: PreProcessedOutput
}

export type PostProcessedOutput = {
  data: KeyValueObject
  title: string
  componentName: string
  metadata: KeyValueObject
}
export type PostProcessor = (
  input: PostProcessedFileInput
) => PostProcessedOutput

type KeyValueObject = { [key: string]: any }
