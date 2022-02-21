import type { PostProcessedOutput } from '../../../lib/typedefs/PostProcess'
import ProcessingWorker from './processingWorker?worker'

export async function processingWorkerWrapper(
  input: File
): Promise<PostProcessedOutput> {
  const processingWorker: Worker = new ProcessingWorker()
  const workerOutput = await new Promise<PostProcessedOutput>((res) => {
    processingWorker.addEventListener('message', (e) => res(e.data), {
      once: true
    })
    processingWorker.postMessage(input)
  })
  processingWorker.terminate()
  return workerOutput
}
