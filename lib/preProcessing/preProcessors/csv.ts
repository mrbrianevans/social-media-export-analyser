import { PreProcessor } from '../../typedefs/PreProcess'
import Papa from 'papaparse'

export type CsvObject = { [key: string]: string | number | boolean }[]
export const csvPreProcessor: PreProcessor<CsvObject> = ({
  filename,
  fileType,
  fileContent
}) => {
  const { data, meta } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  })
  const { length } = data
  return {
    data,
    title: filename,
    metadata: { length, ...meta }
  }
}
