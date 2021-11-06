import { RandElem } from '../RandomArrayUtils'
import { getLanguageFromCode, LanguageCodes } from '../../LanguageCodes'

export const generateRandomLanguage = () => {
  return getLanguageFromCode(generateRandomLanguageCode())
}

export const generateRandomLanguageCode = () => {
  return RandElem(['en', 'fr', 'de', 'es'])
}
