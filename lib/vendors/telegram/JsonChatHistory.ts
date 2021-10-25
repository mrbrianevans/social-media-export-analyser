import { VaadinMessageHistoryFormat } from '../../typedefs/Components'

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
  id: string
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
