import type { GetTopicsOptions, GetTopicsReturnType } from 'fast-topics'
import topicsWasm from 'fast-topics/dist/topics.wasm?url'
import { getTopics, isGetTopicsReady, initialiseWasm } from 'fast-topics'

export interface TopicsWorkerInput {
  documents: string[]
  options: Partial<GetTopicsOptions>
}

export type TopicsWorkerOutput = GetTopicsReturnType
self.addEventListener('message', async (e: MessageEvent<TopicsWorkerInput>) => {
  const output = await topicsWorker(e.data)
  postMessage(output)
})

async function topicsWorker(
  input: TopicsWorkerInput
): Promise<TopicsWorkerOutput> {
  console.time('Initialise wasm')
  await initialiseWasm(topicsWasm)
  console.timeEnd('Initialise wasm')
  // wait for WASM module to load
  let ready = isGetTopicsReady()
  const limit = 50 // max tries before throwing an error. gives it about 10 seconds
  let counter = 0
  while (!ready) {
    if (limit >= counter++)
      throw new Error('could not load wasm in time for fast-topics')
    console.log('WASM not ready yet')
    const checkEvery = 200 // milliseconds between checks
    await new Promise((res) => setTimeout(res, checkEvery))
    ready = isGetTopicsReady()
  }

  const result = getTopics(input.documents, input.options)

  return result
}
