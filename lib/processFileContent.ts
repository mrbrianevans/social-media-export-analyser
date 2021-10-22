import { preProcessingCategoriser } from './preProcessing/preProcessingCategoriser'
import { preProcessorMap } from './preProcessing/preProcessorMap'
import { postProcessingCategoriser } from './postProcessing/postProcessingCategoriser'
import { postProcessorMap } from './postProcessing/postProcessorMap'
import { PostProcessedOutput } from './typedefs/PostProcess'

export const processFileContent: (input: {
  fileContent: string
  filename: string
  fileType: string
}) => PostProcessedOutput = ({ fileContent, filename, fileType }) => {
  const category = preProcessingCategoriser({ filename, fileType })
  const preProcessor = preProcessorMap[category]
  const preProcessedOutput = preProcessor({ filename, fileType, fileContent })

  const postCategory = postProcessingCategoriser({
    filename,
    fileType,
    preProcessedOutput
  })
  const postProcessor = postProcessorMap[postCategory]
  const postProcessedOutput = postProcessor({
    filename,
    fileType,
    preProcessedOutput
  })

  return postProcessedOutput
}
