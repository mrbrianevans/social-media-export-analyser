import { PreProcessor } from '../../typedefs/PreProcess'

export const jsonPreProcessor: PreProcessor = ({
  fileContent,
  filename,
  fileType
}) => {
  const object = JSON.parse(fileContent)

  return {
    data: object,
    title: filename,
    metadata: {
      keys: Object.keys(object),
      isArray: object instanceof Array
    }
  }
}
