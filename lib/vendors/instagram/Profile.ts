import { generateRandomBio } from '../../common/RandomUtils/RandomContent/RandomBios'
import { RandBoolean } from '../../common/RandomUtils/RandomBooleanUtils'
import { generateEmail } from '../../common/RandomUtils/RandomContent/RandomEmail'
import {
  getRandomFirstName,
  getRandomLastName
} from '../../common/RandomUtils/RandomContent/RandomNames'
import { generateUsername } from '../../common/RandomUtils/RandomContent/RandomUsername'
import { formatDateEur, formatDateEurTime } from '../../common/DateUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'

interface InstagramProfile {
  biography: string
  // yyyy-mm-ddThh:mm:ss
  date_joined: string
  email?: string
  gender: 'male' | 'female'
  private_account: boolean
  name: string
  profile_pic_url: string
  username: string
  // yyyy-mm-dd
  connected_facebook_account_date_of_birth: string
  // yyyy-mm-dd
  date_of_birth: string
  profile_picture_changes?: {
    upload_timestamp: string
  }[]
}

export const generateInstagramProfile = (): InstagramProfile => {
  const dateOfBirth = formatDateEur(RandDate(5000, 10000))
  const isMale = RandBoolean()
  const firstName = getRandomFirstName(isMale),
    lastName = getRandomLastName()
  return {
    biography: generateRandomBio(),
    connected_facebook_account_date_of_birth: dateOfBirth,
    date_joined: formatDateEurTime(RandDate(100, 1000)),
    date_of_birth: dateOfBirth,
    email: generateEmail(firstName, lastName),
    gender: isMale ? 'male' : 'female',
    name: `${firstName} ${lastName}`,
    private_account: RandBoolean(),
    profile_pic_url: 'https://scontent.cdninstagram.com',
    username: generateUsername(firstName, lastName)
  }
}
