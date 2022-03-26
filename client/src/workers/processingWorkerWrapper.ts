import ProcessingWorker from './processingWorker?worker'
import type { ProcessedFile } from '../../../lib/processFileContent'

export async function processingWorkerWrapper(
  input: File
): Promise<ProcessedFile> {
  const processingWorker: Worker = new ProcessingWorker()
  const workerOutput = await new Promise<ProcessedFile>((res) => {
    processingWorker.addEventListener('message', (e) => res(e.data), {
      once: true
    })
    processingWorker.postMessage(input)
  })
  processingWorker.terminate()
  return workerOutput
}
