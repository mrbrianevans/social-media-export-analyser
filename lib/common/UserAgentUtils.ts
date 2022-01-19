import UAParser from 'ua-parser-js'

export const getReadableUA = (uaString: string) => {
  const ua = new UAParser(uaString)
  return `${ua.getBrowser().name ?? ''} ${ua.getDevice().vendor ?? ''} ${
    ua.getDevice().model ?? ''
  } ${ua.getDevice().type ?? ''} ${ua.getOS().name ?? ''} ${
    ua.getOS().version ?? ''
  }`
    .replace(/\s+/, ' ')
    .trim()
}
