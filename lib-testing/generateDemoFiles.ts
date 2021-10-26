import * as fs from 'fs'
import * as path from 'path'
import { generateSampleMediaData } from '../lib/vendors/instagram/Media'
import { generateWhatsAppChatHistory } from '../lib/vendors/whatsapp/ChatHistory'

const demoFilePath = (filename) => path.resolve('..', 'demo-files', filename)
export const generateDemoFiles = async () => {
  // instagram media.json (list of posts)
  const instagramMedia = generateSampleMediaData({ photos: 5 })
  fs.writeFileSync(
    demoFilePath('instagram/media.json'),
    JSON.stringify(instagramMedia, null, 2)
  )

  //whatsapp WhatsApp Chat with Demo.txt
  const whatsappConversation = generateWhatsAppChatHistory({})
  fs.writeFileSync(
    demoFilePath('whatsapp/WhatsApp Chat with Demo.txt'),
    whatsappConversation
  )
}

generateDemoFiles()
