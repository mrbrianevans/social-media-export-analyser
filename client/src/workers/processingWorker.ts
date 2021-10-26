import { processFileContent } from '../../../lib/processFileContent'

addEventListener('message', async (e: MessageEvent<File>) => {
  // e.data should be a file reference
  if (!(e.data instanceof File)) return
  const fileContent = await e.data.text()
  const filename = e.data.name
  const fileType = e.data.type

  const postProcessedOutput = processFileContent({
    fileContent,
    filename,
    fileType
  })
  postProcessedOutput.metadata.filename = filename
  postMessage(postProcessedOutput)
})
