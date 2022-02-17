import { TimeSeriesMetadata } from '../common/TimeSeriesAnalysis'
import { FrequencyTables } from '../common/FrequencyAnalysis'
import { GetTopicsOptions } from 'fast-topics'

export type PreProcessingCategory =
  | 'json'
  | 'csv'
  | 'whatsapp'
  | 'text'
  | 'twitterJs'
  | 'image'
  | 'video'
  | 'html'
  | 'vcard'
export type PreProcessingTester = {
  // tests
  filenameRegex?: RegExp
  fileTypes: string[]
  // classification
  preProcessingCategory: PreProcessingCategory
}
export type PreProcessedFileInfo = {
  filename: string
  filepath?: string
  fileType: string
}

export interface WellKnownMetadata extends KeyValueObject {
  ts?: TimeSeriesMetadata
  topics?: {
    documents: string[]
    options: Partial<GetTopicsOptions>
  }
  freq?: FrequencyTables
}

export type PreProcessedOutput<
  DataShape extends KeyValueObject = KeyValueObject
> = {
  data: DataShape
  title: string
  metadata: WellKnownMetadata
}
export type PreProcessor<DataShape extends KeyValueObject = KeyValueObject> =
  (input: {
    fileContent: string
    filename: string
    fileType: string
  }) => PreProcessedOutput<DataShape>

type KeyValueObject = { [key: string]: any }
