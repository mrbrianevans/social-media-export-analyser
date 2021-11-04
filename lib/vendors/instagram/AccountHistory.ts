import { PostProcessor } from '../../typedefs/PostProcess'
import * as UAParser from 'ua-parser-js'
import { getReadableUA } from '../../common/UserAgentUtils'
import { longDateTime } from '../../common/DateUtils'
import { getLanguageFromCode } from '../../common/LanguageCodes'

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
    // hexadecimal
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
