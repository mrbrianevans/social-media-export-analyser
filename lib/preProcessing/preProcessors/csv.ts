import { PreProcessor } from '../../typedefs/PreProcess'

export const csvPreProcessor: PreProcessor = ({
  filename,
  fileType,
  fileContent
}) => {
  const data = readCsvStringToObject(fileContent)
  const { length } = data
  return {
    data,
    title: filename,
    metadata: { length }
  }
}

const readCsvStringToObject = (csvString) => {
  const rawData = csvString
    .split(/\r\n|\r|\n/)
    .map((line) => line.split(',').filter((v) => v.length))
    .filter((line: string[]) => line.length)
  const headers = rawData[0]
  const data = rawData
    .slice(1)
    .map((values) =>
      Object.fromEntries(values.map((value, index) => [headers[index], value]))
    )
  return data
}
