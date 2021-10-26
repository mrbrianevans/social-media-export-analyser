import * as fs from 'fs'
import * as path from 'path'
import { generateSampleMediaData } from '../lib/vendors/instagram/Media'

const demoFilePath = (filename) => path.resolve('..', 'demo-files', filename)
export const generateDemoFiles = async () => {
  // instagram media.json (list of posts)
  const instagramMedia = generateSampleMediaData({ photos: 5 })
  fs.writeFileSync(
    demoFilePath('instagram/media.json'),
    JSON.stringify(instagramMedia, null, 2)
  )
}

generateDemoFiles()
