import { preProcessingCategoriser } from './preProcessing/preProcessingCategoriser'
import { preProcessorMap } from './preProcessing/preProcessorMap'
import {
  getPostProcessByCode,
  postProcessingCategoriser
} from './postProcessing/postProcessingCategoriser'
import { PostProcessedOutput } from './typedefs/PostProcess'

export const processFileContent: (input: {
  fileContent: string
  filename: string
  fileType: string
}) => PostProcessedOutput = ({ fileContent, filename, fileType }) => {
  const preProcessingCategory = preProcessingCategoriser({ filename, fileType })
  console.log('Using', preProcessingCategory, 'for preprocessing')
  const preProcessor = preProcessorMap[preProcessingCategory]
  const preProcessedOutput = preProcessor({ filename, fileType, fileContent })

  const postCategory = postProcessingCategoriser({
    filename,
    fileType,
    preProcessedOutput,
    preProcessingCategory
  })
  console.log('Using', postCategory, 'for postprocessing', filename)
  const postProcess = getPostProcessByCode(postCategory)
  const postProcessor =
    postProcess?.postProcessingFunction ??
    ((i) => ({ ...i.preProcessedOutput }))
  const postProcessedOutput = postProcessor({
    filename,
    fileType,
    preProcessedOutput,
    preProcessingCategory
  })
  const output = {
    ...postProcessedOutput,
    title: postProcess.name ?? filename,
    component: postProcess.component
  }
  return output
}
