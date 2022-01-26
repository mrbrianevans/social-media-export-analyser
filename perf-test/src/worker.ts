addEventListener('message', async (e: MessageEvent<File>) => {
  // e.data should be a file reference
  if (!(e.data instanceof File)) return
  // if mime type category is image or video, then return fileContent = URL
  const fileContent = URL.createObjectURL(e.data)
  postMessage(fileContent)
})
