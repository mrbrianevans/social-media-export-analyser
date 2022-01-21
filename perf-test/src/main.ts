import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <h1>Perf test!</h1>
  <p>Testing uploading a few hundred images and creating URLs for them using the built in file upload input</p>
`

const filesUpload = document.createElement('input')
filesUpload.type = 'file'
filesUpload.multiple = true
filesUpload.webkitdirectory = true
// // @ts-ignore
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
    for (const file of filesUpload.files) {
      if (!file.name.endsWith('jpg')) continue
      const url = URL.createObjectURL(file)
      sessionStorage.setItem(file.name, url)
      addImage(url)
    }
    console.timeEnd(`Create ${filesUpload.files.length} URLs`)
  }
})
