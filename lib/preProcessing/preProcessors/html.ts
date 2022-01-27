import { PreProcessor } from '../../typedefs/PreProcess'
import * as cheerio from 'cheerio'

export const htmlPreProcessor: PreProcessor<{ doc: cheerio.CheerioAPI }> = ({
  fileContent
}) => {
  console.time('Parse HTML in preprocessor')
  const doc = cheerio.load(fileContent)
  console.timeEnd('Parse HTML in preprocessor')
  return {
    data: { doc },
    title: 'HTML Document',
    metadata: {}
  }
}
