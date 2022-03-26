import { preProcessingCategoriser } from './preProcessing/preProcessingCategoriser'
import { preProcessorMap } from './preProcessing/preProcessorMap'
import {
  getPostProcessByCode,
  postProcessingCategoriser
} from './postProcessing/postProcessingCategoriser'
import { PostProcessedOutput } from './typedefs/PostProcess'
import { ComponentName } from './typedefs/Components'

export type ProcessedFile = PostProcessedOutput & {
  component: ComponentName
}

export const processFileContent: (input: {
  fileContent: string
  filename: string
  fileType: string
}) => ProcessedFile = ({ fileContent, filename, fileType }) => {
  const preProcessingCategory = preProcessingCategoriser({ filename, fileType })
  const preProcessor = preProcessorMap[preProcessingCategory]
  const preProcessedOutput = preProcessor({ filename, fileType, fileContent })
  Object.assign(preProcessedOutput.metadata, {
    filename,
    fileType,
    fileContent,
    preProcessingCategory
  })
  const postProcessingCategory = postProcessingCategoriser({
    filename,
    fileType,
    preProcessedOutput,
    preProcessingCategory
  })
  console.log('Using', postProcessingCategory, 'for postprocessing', filename)
  const postProcess = getPostProcessByCode(postProcessingCategory)
  const postProcessor =
    postProcess?.postProcessingFunction ??
    ((i) => ({ ...i.preProcessedOutput }))
  const postProcessedOutput = postProcessor({
    filename,
    fileType,
    preProcessedOutput,
    preProcessingCategory
  })
  Object.assign(postProcessedOutput.metadata, {
    filename,
    fileType,
    fileContent,
    preProcessingCategory,
    postProcessingCategory
  })
  return {
    ...postProcessedOutput,
    title: postProcess.name ?? filename,
    component: postProcess.component
  }
}
