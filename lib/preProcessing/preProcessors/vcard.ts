import { PreProcessor } from '../../typedefs/PreProcess'
import { ParsedVCards, parseVCards, sortByPREF } from 'vcard4-ts'

export const vcardPreProcessor: PreProcessor<ParsedVCards['vCards']> = ({
  filename,
  fileType,
  fileContent
}) => {
  const { nags, vCards } = parseVCards(fileContent, true)
  const { length } = vCards
  return {
    data: vCards,
    title: filename,
    metadata: { length, nags }
  }
}
