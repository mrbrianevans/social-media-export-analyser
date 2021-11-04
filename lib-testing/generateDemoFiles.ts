import * as fs from 'fs'
import * as path from 'path'
import { generateSampleMediaData } from '../lib/vendors/instagram/Media'
import { generateWhatsAppChatHistory } from '../lib/vendors/whatsapp/ChatHistory'
import { generateTelegramChatHistory } from '../lib/vendors/telegram/JsonChatHistory'
import { generateInstagramProfile } from '../lib/vendors/instagram/Profile'
import { generateTwitterTweetFile } from '../lib/vendors/twitter/Tweets'
import { generateInstagramConnections } from '../lib/vendors/instagram/Connections'

const demoFilePath = (filename) => path.resolve('..', 'demo-files', filename)
export const generateDemoFiles = async () => {
  // instagram media.json (list of posts)
  const instagramMedia = generateSampleMediaData({ photos: 5 })
  fs.writeFileSync(
    demoFilePath('instagram/media.json'),
    JSON.stringify(instagramMedia, null, 2)
  )
  //instagram profile.json
  const instagramProfile = generateInstagramProfile()
  fs.writeFileSync(
    demoFilePath('instagram/profile.json'),
    JSON.stringify(instagramProfile, null, 2)
  )

  //instagram connections.json
  const instagramConnections = generateInstagramConnections({})
  fs.writeFileSync(
    demoFilePath('instagram/connections.json'),
    JSON.stringify(instagramConnections, null, 2)
  )

  //whatsapp WhatsApp Chat with Demo.txt
  const whatsappConversation = generateWhatsAppChatHistory({
    numberOfMessages: 5
  })
  fs.writeFileSync(
    demoFilePath('whatsapp/WhatsApp Chat with Demo.txt'),
    whatsappConversation
  )

  //telegram result.json
  const telegramConversation = generateTelegramChatHistory({
    numberOfMessages: 5
  })
  fs.writeFileSync(
    demoFilePath('telegram/result.json'),
    JSON.stringify(telegramConversation, null, 2)
  )

  //twitter
  const twitterTweets = generateTwitterTweetFile({})
  fs.writeFileSync(demoFilePath('twitter/tweet.js'), twitterTweets)
}

generateDemoFiles()
