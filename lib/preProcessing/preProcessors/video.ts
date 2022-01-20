import { PreProcessor } from '../../typedefs/PreProcess'

export interface VideoData {
  url: string
}

export const videoPreProcessor: PreProcessor = ({
  fileContent,
  filename,
  fileType
}) => ({
  data: { url: fileContent },
  title: 'Video',
  metadata: {}
})
