// a Web Worker to parse json in a separate thread to the main website
// this helps to not freeze the website while large json files are being parsed

addEventListener('message', async (e: MessageEvent<File>) => {
  // e.data should be a file reference
  if (!(e.data instanceof File)) return
  const content = await e.data.text()
  try {
    const object = JSON.parse(content)
    let data = []
    if (object instanceof Array) data = object
    else {
      for (const [key, value] of Object.entries(object)) {
        if (value instanceof Array && value.length > data.length) {
          data = value
        }
      }
    }

    postMessage(data.slice(0, 500))
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.log('Cannot interpret JSON object, not valid syntax')
    }
  }
})

export {}
