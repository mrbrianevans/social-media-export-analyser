import { PostProcessor } from '../../typedefs/PostProcess'
import * as UAParser from 'ua-parser-js'
import { getReadableUA } from '../../common/UserAgentUtils'
import { formatDateEurTimeWithTz, longDateTime } from '../../common/DateUtils'
import { getLanguageFromCode } from '../../common/LanguageCodes'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateSentence } from '../../common/RandomUtils/RandomContent/RandomSentence'
import { commentWords } from '../../common/RandomUtils/RandomContent/RandomWords'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'
import { getRandomUserAgent } from '../../common/RandomUtils/RandomUserAgent'
import {
  generateRandomLanguage,
  generateRandomLanguageCode
} from '../../common/RandomUtils/RandomContent/RandomLanguage'
import { generateRandomIpAddress } from '../../common/RandomUtils/RandomIpAddress'
import { range, repeat } from '../../common/ArrayUtils'
import { RandElem } from '../../common/RandomUtils/RandomArrayUtils'
import {
  AlphabetCharacters,
  AlphaNumericCharacters,
  HexCharacters
} from '../../common/RandomUtils/RandomContent/Characters'

export interface InstagramAccountHistory {
  login_history: {
    // eg "*************************Y6H"
    cookie_name: string
    // IPv4 or IPv6 address
    ip_address: string
    // eg 'en'
    language_code: string
    //eg '2020-07-12T20:51:33+00:00'
    timestamp: string
    user_agent: string
    // hexadecimal with dashes or the empty string
    device_id: string
  }[]
}
export type InstagramAccountHistoryProcessed = {
  ipAddress: string
  language: string
  timestamp: string
  device: string
}[]
export const instagramAccountHistoryPostProcessor: PostProcessor<
  InstagramAccountHistory,
  InstagramAccountHistoryProcessed
> = (input) => {
  const data = input.preProcessedOutput.data.login_history.map((l) => ({
    ipAddress: l.ip_address,
    language: getLanguageFromCode(l.language_code),
    timestamp: longDateTime(new Date(l.timestamp)),
    device: getReadableUA(l.user_agent)
  }))
  return { ...input.preProcessedOutput, data }
}

const generateDeviceId = () => {
  return repeat(3, () =>
    repeat(6, () => RandElem(HexCharacters)).join('')
  ).join('-')
}

export const generateInstagramAccountHistory = ({
  qty = 10
}): InstagramAccountHistory => {
  const language_code = generateRandomLanguageCode()
  const devices = repeat(3, () => ({
    id: generateDeviceId(),
    ua: getRandomUserAgent()
  }))
  const login_history: InstagramAccountHistory['login_history'] = Array.from(
    { length: qty },
    () => {
      const device = RandElem(devices)
      return {
        user_agent: device.ua,
        timestamp: formatDateEurTimeWithTz(RandDate()),
        language_code,
        ip_address: generateRandomIpAddress(),
        cookie_name:
          '*************************' +
          repeat(3, () => RandElem(AlphaNumericCharacters)).join(''),
        device_id: device.id
      }
    }
  )
  return { login_history }
}
