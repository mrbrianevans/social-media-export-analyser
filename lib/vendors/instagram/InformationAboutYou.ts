import { generateEmail } from '../../common/RandomUtils/RandomContent/RandomEmail'
import { RandElem } from '../../common/RandomUtils/RandomArrayUtils'
import { BritishCities } from '../../common/RandomUtils/RandomContent/RandomPlaces'
import { RandBoolean } from '../../common/RandomUtils/RandomBooleanUtils'

export interface InformationAboutYou {
  primary_location: { city_name: string }
  inferred_emails?: string[]
}

export const generateInstagramInformationAboutYou = (): InformationAboutYou => {
  return {
    primary_location: { city_name: RandElem(BritishCities) },
    inferred_emails: RandBoolean() ? [generateEmail()] : undefined
  }
}
