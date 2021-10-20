// a Web Worker to parse json in a separate thread to the main website
// this helps to not freeze the website while large json files are being parsed

onmessage = (message) => {
  // console.log(Date(), '[WORKER] Got the string to parse')
  console.time('[WORKER] Parse JSON file')
  const object = JSON.parse(message.data)
  console.timeEnd('[WORKER] Parse JSON file')
  let data = []
  if (object instanceof Array) data = object
  else {
    for (const [key, value] of Object.entries(object)) {
      if (value instanceof Array) {
        data = value
      }
    }
  }

  postMessage(data.slice(0, 50))
}

export {}
