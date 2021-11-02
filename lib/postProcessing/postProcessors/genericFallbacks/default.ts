// this should hopefully never be used, but just in case
import {
  PostProcess,
  PostProcessedFileInput,
  PostProcessedOutput
} from '../../../typedefs/PostProcess'

export const DefaultPostProcess: PostProcess = {
  code: 'default',
  classifier: { topLevelIsArray: null, filenameRegex: /.*/ },
  component: 'StringBox',
  postProcessingFunction: DefaultPostProcessor
}

function DefaultPostProcessor(
  input: PostProcessedFileInput
): PostProcessedOutput<{ text: any }> {
  return {
    data: { text: input.preProcessedOutput.data },
    title: input.filename,
    metadata: { ...input.preProcessedOutput.metadata }
  }
}
