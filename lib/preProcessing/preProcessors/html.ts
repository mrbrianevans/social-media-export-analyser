import { PreProcessor } from '../../typedefs/PreProcess'
import * as cheerio from 'cheerio'

export interface HtmlDataObject {}

export const htmlPreProcessor: PreProcessor = ({
  fileContent,
  filename,
  fileType
}) => {
  return {
    data: { text: fileContent },
    title: 'HTML Document',
    metadata: {}
  }
}
