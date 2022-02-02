import { PreProcessor } from '../../typedefs/PreProcess'
import * as Papa from 'papaparse'
export const csvPreProcessor: PreProcessor<
  { [key: string]: string | number | boolean }[]
> = ({ filename, fileType, fileContent }) => {
  const data = readCsvStringToObject(fileContent)
  const { length } = data
  return {
    data,
    title: filename,
    metadata: { length }
  }
}

const readCsvStringToObject = (csvString) => {
  return Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  }).data
}
