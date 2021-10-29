import { PreProcessedOutput, PreProcessingCategory } from './PreProcess'
import { ComponentName } from './Components'

export type PostProcessingCategory =
  | 'default-object'
  | 'whatsapp-messages'
  | 'telegram-messages'
  | 'default-array'
  | 'instagram-posts'
  | 'text'

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
export type PostProcessedFileInput<
  DataShape extends KeyValueObject = KeyValueObject
> = {
  filename: string
  filepath?: string
  fileType: string
  preProcessingCategory: PreProcessingCategory
  preProcessedOutput: PreProcessedOutput<DataShape>
}

export type PostProcessedOutput<
  DataShape extends KeyValueObject = KeyValueObject
> = {
  data: DataShape
  title: string
  componentName: ComponentName
  metadata: KeyValueObject
}
export type PostProcessor<
  Input extends KeyValueObject = KeyValueObject,
  Output extends KeyValueObject = KeyValueObject
> = (input: PostProcessedFileInput<Input>) => PostProcessedOutput<Output>

type KeyValueObject = { [key: string]: any }
