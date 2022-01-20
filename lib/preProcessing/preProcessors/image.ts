import { PreProcessor } from '../../typedefs/PreProcess'

export interface ImageDataObject {
  url: string
}

export const imagePreProcessor: PreProcessor<ImageDataObject> = ({
  fileContent,
  filename,
  fileType
}) => ({
  data: { url: fileContent },
  title: 'Image',
  metadata: {}
})
