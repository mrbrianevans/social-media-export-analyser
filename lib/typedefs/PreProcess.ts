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

export type PreProcessedOutput<
  DataShape extends KeyValueObject = KeyValueObject
> = {
  data: DataShape
  title: string
  metadata: KeyValueObject
}
export type PreProcessor<DataShape extends KeyValueObject = KeyValueObject> =
  (input: {
    fileContent: string
    filename: string
    fileType: string
  }) => PreProcessedOutput<DataShape>

type KeyValueObject = { [key: string]: any }
