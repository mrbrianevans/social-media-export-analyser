import { preProcessingCategoriser } from './preProcessing/preProcessingCategoriser'
import { preProcessorMap } from './preProcessing/preProcessorMap'
import { postProcessingCategoriser } from './postProcessing/postProcessingCategoriser'
import { PostProcessedOutput } from './typedefs/PostProcess'

export const processFileContent: (input: {
  fileContent: string
  filename: string
  fileType: string
}) => PostProcessedOutput = ({ fileContent, filename, fileType }) => {
  const preProcessingCategory = preProcessingCategoriser({ filename, fileType })
  //@ts-ignore
  console.log('Using', preProcessingCategory, 'for preprocessing')
  const preProcessor = preProcessorMap[preProcessingCategory]
  const preProcessedOutput = preProcessor({ filename, fileType, fileContent })

  const postCategory = postProcessingCategoriser({
    filename,
    fileType,
    preProcessedOutput,
    preProcessingCategory
  })
  //@ts-ignore
  console.log('Using', postCategory.code, 'for postprocessing')
  const postProcessor =
    postCategory.postProcessingFunction ??
    ((i) => ({ ...i.preProcessedOutput }))
  const postProcessedOutput = postProcessor({
    filename,
    fileType,
    preProcessedOutput,
    preProcessingCategory
  })
  return postProcessedOutput
}
