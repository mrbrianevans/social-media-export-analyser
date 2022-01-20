/**
 * Check if a file is media (image or video) by its mime type
 * @param fileType - mime type
 * @example
 * if(isMedia('image/jpg')) console.log('File is media')
 * isMedia('video/mp4') // true
 * isMedia('image/png') // true
 * isMedia('application/json') // false
 */
export function isMedia(fileType: string) {
  return fileType.match(/^(image|audio|video)/) !== null
}

// commonly used video and audio types
const videoAndAudioTypes = ['mp4', 'mpeg', '3gpp', 'ogg', 'webm']

// commonly used image types suffixes
export const CommonImageTypes = [
  'apng',
  'avif',
  'gif',
  'jpeg',
  'png',
  'svg+xml',
  'webp'
]
// commonly used video mime types suffixes
export const CommonVideoTypes = videoAndAudioTypes.concat(['quicktime'])
// commonly used audio mime types suffixes
export const CommonAudioTypes = videoAndAudioTypes.concat([
  'aac',
  'flac',
  'wav'
])
