export type PreProcessingCategory = 'json' | 'csv' | 'whatsapp' | 'text'
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

export type PreProcessedOutput = {
  data: KeyValueObject
  title: string
  metadata: KeyValueObject
}
export type PreProcessor = (input: {
  fileContent: string
  filename: string
  fileType: string
}) => PreProcessedOutput

type KeyValueObject = { [key: string]: any }
