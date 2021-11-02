import { VaadinMessageHistoryFormat } from '../../typedefs/Components'
import { getRandomFullName } from '../../common/RandomUtils/RandomContent/RandomNames'
import { RandInt } from '../../common/RandomUtils/RandomNumberUtils'
import { RandDate } from '../../common/RandomUtils/RandomDateUtils'
import { generateTextMessage } from '../../common/RandomUtils/RandomContent/RandomSentence'
import { formatDateEurTime } from '../../common/DateUtils'

interface TelegramMessage {
  id: number
  type: 'message'
  date: string
  from: string
  from_id: string
  text: string
}

interface TelegramServiceEvent {
  id: number
  type: 'service'
  date: string
  actor: string
  actor_id: string
  action: string
  title?: string
  members?: string[]
  text: ''
}

type TelegramEvent = TelegramMessage | TelegramServiceEvent
export interface TelegramChatHistory {
  name: string
  type: string
  id: number
  messages: TelegramEvent[]
}
export const convertTelegramJsonChatHistoryToVaadinMessages = (
  jsonHistory: TelegramChatHistory
): VaadinMessageHistoryFormat => {
  // this is done with map and filter null for the typescript compiler
  return jsonHistory.messages
    .map((message) => (message.type !== 'service' ? message : null))
    .filter((message) => message !== null)
    .map((message) => ({
      text: message.text,
      time: new Date(message.date).toString(),
      userName: message.from
    }))
}

const generateUserId = () => {
  return `user${RandInt(1_000_000, 1_000_000_000)}`
}
export const generateTelegramChatHistory = ({
  numberOfMessages = 20
}): TelegramChatHistory => {
  const sender = getRandomFullName()
  const recipient = getRandomFullName()
  const names = [sender, recipient]
  const userIds = [generateUserId(), generateUserId()]
  return {
    id: RandInt(1000000, 1000000000),
    name: recipient,
    type: 'private_chat',
    messages: Array(numberOfMessages)
      .fill(null)
      .map((n, index) => {
        const actor = RandInt(0, 1)
        return {
          id: index,
          type: 'message',
          date: formatDateEurTime(RandDate(index, index + 1)),
          from: names[actor],
          from_id: userIds[actor],
          text: generateTextMessage()
        }
      })
  }
}
