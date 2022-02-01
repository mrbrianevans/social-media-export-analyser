// import { range, shuffle } from 'ts-closure-library/lib/array/array'
import { Parser } from 'htmlparser2'
import { DomHandler } from 'domhandler'
// import { levenshtein } from 'levenshtein-wasm'
import { initialiseWasm, getTopics } from 'fast-topics'
import topicsUrl from 'fast-topics/dist/topics.wasm?url'
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ProcessingWorker from './worker?worker=true'
import './style.css'
import '@vaadin/text-field'
import '@vaadin/icons'
import * as cheerio from 'cheerio'
// import initWasm from '@y21/tljs/node/dist/bindings.wasm'
import * as tljs from '@y21/tljs'
import wasmUrl from '@y21/tljs/node/dist/bindings.wasm?url'
console.log('Script running')
tljs.setInitializerCallback((sync: boolean) => {
  console.log('Fetching WASM module', { sync })
  return fetch(wasmUrl).then((res) => res.arrayBuffer())
})
// console.time('Load WASM module')
// initWasm({})
//   // @ts-ignore
//   .then((wasmExports) => tljs.setWasmExports(wasmExports))
//   .then(() => console.timeEnd('Load WASM module'))

// load getTopics wasm
console.time('Load my WASM module')
fetch(topicsUrl)
  .then((r) => r.arrayBuffer())
  .then((binary) => initialiseWasm(binary))
  .then(() => console.timeEnd('Load my WASM module'))
  .catch((e: Error) =>
    console.error("Couldn't load my wasm module:", e.message)
  )

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <h1>Perf test!<vaadin-icon icon="lumo:photo"></vaadin-icon><vaadin-icon icon="vaadin:search"></vaadin-icon></h1>
  <vaadin-text-field placeholder="Search"><vaadin-icon icon="vaadin:phone" slot='prefix'></vaadin-icon></vaadin-text-field>
  <p>Testing uploading a few hundred images and creating URLs for them using the built in file upload input</p>
`
// const arr = range(10)
// shuffle(arr)
// console.log('Google Array:', arr)

// console.log(
//   'levenshtein distances:'
//   // levenshtein(['google', 'array', 'element', 'input'])
// )
const filesUpload = document.createElement('input')
filesUpload.type = 'file'
filesUpload.multiple = true
// filesUpload.webkitdirectory = true

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
      if (file.name.endsWith('jpg')) {
        getUrlFromWorker(file).then((url) => {
          sessionStorage.setItem(file.name, url)
          addImage(url)
        })
      } else if (file.name.endsWith('html')) {
        console.log('HTML file detected')
        const handler = new DomHandler((error) =>
          error
            ? console.error(error)
            : console.timeEnd('Parse HTML with htmlparse2')
        )
        const parser = new Parser(handler)

        file
          .text()
          .then((t) => {
            console.time('Parse HTML with htmlparse2')
            parser.write(t)
          })
          .then(() => parser.end())
          .then(() => {
            return file
              .text()
              .then(async (t) => {
                console.time('Parse HTML with tljs')
                const dom = await tljs.parse(t)
                console.timeEnd('Parse HTML with tljs')
                return dom
              })
              .then((dom) => {
                console.time('Get elements by classname')
                const reg =
                  /Watched <a href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9]+?)">(.+?)<\/a>/
                const els = dom
                  .getElementsByClassName('outer-cell')
                  .map((d) => d.innerHTML())
                  .filter((e) =>
                    e.startsWith(
                      '<div class="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp"><div class="mdl-grid"><div class="header-cell mdl-cell mdl-cell--12-col"><p class="mdl-typography--title">YouTube<br></p>'
                    )
                  )
                  .map((e) => e.match(reg)?.[2] as string)
                  .filter((e) => e && !e.startsWith('https:'))
                console.timeEnd('Get elements by classname')
                // console.log(
                //   'tljs dom elements',
                //   Array.from(
                //     new Set(els.filter((e, i) => i % 2 === 0).slice(0, 420))
                //   ).join(' ')
                // )
                const uniqueVideoTitles = Array.from(new Set(els))
                console.log(uniqueVideoTitles)
                const { docs, topics } = getTopics(
                  uniqueVideoTitles.slice(0, 100),
                  {
                    numberOfTopics: 10
                  }
                )
                console.log(docs, topics)
                // @ts-ignore
                const docs1 = Object.fromEntries(
                  Object.entries(docs).map(([k, v]) => [Number(k), v])
                )
                console.log(docs1)
                // console.log(docs1.map((d) => d[0]))
                // console.log(topics.map((t) => t.slice(0, 3)))
              })
              .catch((e) => console.error('TLJS parse failed:', e))
          })
          .then(() => {
            return file.text().then((fileContent) => {
              console.time('Parse HTML in cheerio')
              cheerio.load(fileContent)
              console.timeEnd('Parse HTML in cheerio')
            })
          })
      }
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
