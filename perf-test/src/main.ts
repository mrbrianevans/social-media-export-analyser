import { range, shuffle } from 'ts-closure-library/lib/array/array'
// import { levenshtein } from 'levenshtein-wasm'
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ProcessingWorker from './worker?worker=true'
import './style.css'
import '@vaadin/text-field'
import '@vaadin/icons'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <h1>Perf test!<vaadin-icon icon="lumo:photo"></vaadin-icon><vaadin-icon icon="vaadin:search"></vaadin-icon></h1>
  <vaadin-text-field placeholder="Search"><vaadin-icon icon="vaadin:phone" slot='prefix'></vaadin-icon></vaadin-text-field>
  <p>Testing uploading a few hundred images and creating URLs for them using the built in file upload input</p>
`
const arr = range(10)
shuffle(arr)
console.log('Google Array:', arr)

console.log(
  'levenshtein distances:'
  // levenshtein(['google', 'array', 'element', 'input'])
)
const filesUpload = document.createElement('input')
filesUpload.type = 'file'
filesUpload.multiple = true
filesUpload.webkitdirectory = true

// filesUpload.directory = true
app.appendChild(filesUpload)

const gallery = document.createElement('div')
gallery.id = 'gallery'
app.appendChild(gallery)

function addImage(url: string) {
  const image = document.createElement('img')
  image.src = url
  gallery.appendChild(image)
}

filesUpload.addEventListener('input', () => {
  console.log(filesUpload.files)
  if (filesUpload.files) {
    console.time(`Create ${filesUpload.files.length} URLs`)

    for (const file of filesUpload.files as unknown as File[]) {
      if (!file.name.endsWith('jpg')) continue
      getUrlFromWorker(file).then((url) => {
        sessionStorage.setItem(file.name, url)
        addImage(url)
      })
    }
    console.timeEnd(`Create ${filesUpload.files.length} URLs`)
  }
})

async function getUrlFromWorker(file: File) {
  const worker: Worker = new ProcessingWorker()

  worker.postMessage(file)
  // console.dir(file)
  const workerOutput: string = await new Promise((resolve) => {
    worker.onmessage = (message) => {
      resolve(message.data)
    }
  })
  return workerOutput
}
