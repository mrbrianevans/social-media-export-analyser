import { PreProcessor } from '../../typedefs/PreProcess'

export const textPreProcessor: PreProcessor = ({
  fileContent,
  filename,
  fileType
}) => {
  return {
    metadata: { fileType },
    title: filename,
    data: { text: fileContent }
  }
}
