import * as fs from 'fs'
import * as path from 'path'
import { generateSampleMediaData } from '../lib/vendors/instagram/Media'
import { generateWhatsAppChatHistory } from '../lib/vendors/whatsapp/ChatHistory'
import { generateTelegramChatHistory } from '../lib/vendors/telegram/JsonChatHistory'
import { generateInstagramProfile } from '../lib/vendors/instagram/Profile'
import { generateTwitterTweetFile } from '../lib/vendors/twitter/Tweets'
import { generateInstagramConnections } from '../lib/vendors/instagram/Connections'
import { generateInstagramComments } from '../lib/vendors/instagram/Comments'
import { generateInstagramLikes } from '../lib/vendors/instagram/Likes'
import { generateInstagramAccountHistory } from '../lib/vendors/instagram/AccountHistory'
import { generateInstagramInformationAboutYou } from '../lib/vendors/instagram/InformationAboutYou'
import { generateContactsFile } from '../lib/vendors/google/Contacts'

export const demoFilePath = (filename) => {
  const filePath = path.resolve('..', 'demo-files', filename)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  return filePath
}

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

  //instagram comments.json
  const instagramComments = generateInstagramComments({})
  fs.writeFileSync(
    demoFilePath('instagram/comments.json'),
    JSON.stringify(instagramComments, null, 2)
  )
  //instagram likes.json
  const instagramLikes = generateInstagramLikes({})
  fs.writeFileSync(
    demoFilePath('instagram/likes.json'),
    JSON.stringify(instagramLikes, null, 2)
  )

  //instagram account_history.json
  const instagramAccountHistory = generateInstagramAccountHistory({})
  fs.writeFileSync(
    demoFilePath('instagram/account_history.json'),
    JSON.stringify(instagramAccountHistory, null, 2)
  )

  //instagram information_about_you.json
  const instagramInformationAboutYou = generateInstagramInformationAboutYou()
  fs.writeFileSync(
    demoFilePath('instagram/information_about_you.json'),
    JSON.stringify(instagramInformationAboutYou, null, 2)
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
  const twitterTweets = generateTwitterTweetFile({ qty: 15 })
  fs.writeFileSync(demoFilePath('twitter/tweet.js'), twitterTweets)

  //contacts
  const contactsCsv = generateContactsFile()
  fs.writeFileSync(demoFilePath('contacts/contacts.csv'), contactsCsv)
}

generateDemoFiles()
