export const parseWhatsAppChatHistory = (
  chatHistory: string
): WhatsAppChatHistoryArray => {
  const lines = chatHistory.split(/\r\n|\r|\n/)
  return lines
    .map((line) => {
      try {
        const [, timestring, allContent] = line.match(
          /^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}, [0-9]{1,2}:[0-9]{2} [A|P]M) - (.*)$/
        )
        const contentParts = allContent.match(/(.*?): (.*)$/)
        // default values for system messages (eg security code has changed)
        let from = 'system',
          content = allContent
        if (contentParts) {
          ;[, from, content] = contentParts
        }
        return {
          content,
          timestamp: new Date(timestring).getTime(),
          from
        }
      } catch (e) {
        return {
          content: `Error occurred while parsing this message: ${e.message}`,
          timestamp: new Date().getTime(),
          from: 'System parser'
        }
      }
    })
    .filter((m) => m.from !== 'System parser')
    .sort((a, b) => b.timestamp - a.timestamp)
}

type WhatsAppChatHistoryItem = {
  from: string
  timestamp: number
  content: string
}

export type WhatsAppChatHistoryArray = WhatsAppChatHistoryItem[]

export const convertWhatsappHistoryToVaadinMessages = (
  history: WhatsAppChatHistoryArray
) => {
  return history.map((item) => ({
    time: new Date(item.timestamp).toString(),
    userName: item.from,
    text: item.content
  }))
}
