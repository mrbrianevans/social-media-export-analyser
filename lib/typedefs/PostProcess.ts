import {
  PreProcessedOutput,
  PreProcessingCategory,
  WellKnownMetadata
} from './PreProcess'
import { ComponentName } from './Components'
import { FileType } from './FileTypes'

export type PostProcessedFileInput<
  DataShape extends KeyValueObject = KeyValueObject
> = {
  filename: string
  filepath?: string
  fileType: string
  preProcessingCategory: PreProcessingCategory
  preProcessedOutput: PreProcessedOutput<DataShape>
}

export type PostProcessedOutput<DataShape extends KeyValueObject = KeyValueObject> = {
  data: DataShape
  title: string
  metadata: WellKnownMetadata
}
export type PostProcessor<
  Input extends KeyValueObject = KeyValueObject,
  Output extends KeyValueObject = KeyValueObject
> = (input: PostProcessedFileInput<Input>) => PostProcessedOutput<Output>

type KeyValueObject = { [key: string]: any }

export interface PostProcess {
  // optional name of this tab, if not provided then the filename is used
  name?: string
  // some unchanging code to represent this processor. hyphenated lowercase
  code: string
  // a format for the name, variables will be substituted in to {var_name}
  nameFormat?: string
  // characteristics of data by which to determine whether to use this processor
  classifier: {
    filenameRegex: RegExp
    fileTypes?: FileType[]
    topLevelIsArray: boolean
    preProcessingCategory?: PreProcessingCategory
    // if top level is array, this is checked on first few items. otherwise top level object
    itemCriteria?: {
      maxDepth?: number
      minDepth?: number
      keys?: string[]
    }
  }
  // vendor such as Google or Apple
  vendor?: string
  // optional function to transform the data. if not provided, raw data is passed through
  postProcessingFunction?: PostProcessor
  // svelte component name to render this data to the user
  component: ComponentName
}
