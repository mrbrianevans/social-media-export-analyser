import { processFileContent } from '../../../lib/processFileContent'
import { isMedia } from '../../../lib/common/isMedia'

addEventListener('message', async (e: MessageEvent<File>) => {
  // e.data should be a file reference
  if (!(e.data instanceof File)) return
  const filename = e.data.name
  const fileType = e.data.type
  // if mime type category is image or video, then return fileContent = URL
  const fileContent = isMedia(fileType)
    ? URL.createObjectURL(e.data)
    : await e.data.text()
  const postProcessedOutput = processFileContent({
    fileContent,
    filename,
    fileType
  })
  postProcessedOutput.metadata.filename = filename
  if (isMedia(fileType)) postProcessedOutput.metadata.isMedia = true
  postMessage(postProcessedOutput)
})
