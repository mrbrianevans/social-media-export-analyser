import { RandBoolean } from './RandomBooleanUtils'
import { RandInt } from './RandomNumberUtils'

// gives a href to a image on randomuser.me
export const getRandomProfilePhoto = (isMale?: boolean) => {
  isMale ??= RandBoolean()
  const genderString = isMale ? 'men' : 'women'
  return `https://randomuser.me/api/portraits/${genderString}/${RandInt(
    0,
    99
  )}.jpg`
}
