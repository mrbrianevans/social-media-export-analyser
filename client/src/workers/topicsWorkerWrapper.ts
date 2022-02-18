import type { TopicsWorkerInput, TopicsWorkerOutput } from './topicsWorker'
import TopicsWorker from './topicsWorker?worker'

export async function topicsWorkerWrapper(
  input: TopicsWorkerInput
): Promise<TopicsWorkerOutput> {
  const topicsWorker: Worker = new TopicsWorker()
  const workerOutput = await new Promise<TopicsWorkerOutput>((res) => {
    topicsWorker.addEventListener('message', (e) => res(e.data), { once: true })
    topicsWorker.postMessage(input)
  })
  topicsWorker.terminate()
  return workerOutput
}
