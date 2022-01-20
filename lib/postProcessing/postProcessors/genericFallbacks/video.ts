import {
  PostProcess,
  PostProcessedFileInput,
  PostProcessedOutput
} from '../../../typedefs/PostProcess'
import { ImageDataObject } from '../../../preProcessing/preProcessors/image'

export const VideoPostProcess: PostProcess = {
  code: 'video',
  classifier: {
    topLevelIsArray: false,
    filenameRegex: /\.(3pg|mpe?g|mp4|m4v|m4p|ogg|ogv|mov|webm)$/i,
    preProcessingCategory: 'video'
  },
  component: 'Video'
}
