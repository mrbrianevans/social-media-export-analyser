import {
  PostProcess,
  PostProcessedFileInput,
  PostProcessedOutput
} from '../../../typedefs/PostProcess'
import { ImageDataObject } from '../../../preProcessing/preProcessors/image'

export const ImagePostProcess: PostProcess = {
  code: 'image',
  classifier: {
    topLevelIsArray: false,
    filenameRegex: /\.(jpe?g|png|svg|webp|apng|avif|gif|jfif|pjpeg|pjp)$/i,
    preProcessingCategory: 'image'
  },
  component: 'Image',
  postProcessingFunction: ImagePostProcessor
}

function ImagePostProcessor(
  input: PostProcessedFileInput<ImageDataObject>
): PostProcessedOutput<ImageDataObject> {
  return input.preProcessedOutput
}
