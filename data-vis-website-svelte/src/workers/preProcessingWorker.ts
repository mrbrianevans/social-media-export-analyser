import { preProcessingCategoriser } from '../../../lib/preProcessing/preProcessingCategoriser'
import { preProcessorMap } from '../../../lib/preProcessing/preProcessorMap'

addEventListener('message', async (e: MessageEvent<File>) => {
  // e.data should be a file reference
  if (!(e.data instanceof File)) return
  const fileContent = await e.data.text()
  const filename = e.data.name
  const fileType = e.data.type

  const category = preProcessingCategoriser({ filename, fileType })
  const preProcessor = preProcessorMap[category]
  const processedOutput = preProcessor({ filename, fileType, fileContent })
})

export {}
