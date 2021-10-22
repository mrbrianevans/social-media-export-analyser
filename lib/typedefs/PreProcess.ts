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

type PreProcessedOutput = { data: Object; title: string; metadata: Object }
export type PreProcessor = (input: {
  fileContent: string
  filename: string
  fileType: string
}) => PreProcessedOutput
