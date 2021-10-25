<script lang="ts">
  import FilePond, { registerPlugin } from 'svelte-filepond';
  import * as papa from 'papaparse'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  import JsonParser from '../workers/jsonParserWorker?worker'
  import ProcessingWorker from '../workers/processingWorker?worker'
  import {
    convertWhatsappHistoryToVaadinMessages,
    parseWhatsAppChatHistory
  } from '../../../lib/vendors/whatsapp/ChatHistory'
  import type { FileItem } from '../types/FileItem'
  // Register the plugins
  registerPlugin( FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;
  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond';
  let filesObj: {[name: string]: FileItem} = {}
  export let files: FileItem[] = []
  async function handleAddFile(err, fileItem) {
    console.log('Relative path', fileItem.relativePath)
    console.log('fileItem', fileItem)
    const jsonWorker = new JsonParser()
    const worker = new ProcessingWorker()

    worker.postMessage(fileItem.file)
    const workerOutput = await new Promise(resolve => {
      worker.onmessage = message => {
        resolve(message.data)
      }
    })
    console.log({ workerOutput })
    // files = [...files, workerOutput]
    const file: FileItem = {name: fileItem.filename, title: fileItem.filenameWithoutExtension}
    console.log('A file has been added', fileItem.filename,fileItem.fileType);
    if(fileItem.fileExtension === 'csv' || fileItem.fileType === 'application/vnd.ms-excel'|| fileItem.fileType === 'text/csv') {
      file.data = await new Promise((resolve, reject) => {
        papa.parse(fileItem.file, {
        complete(results, file) {
          resolve(results.data)
        }, header: true, worker: true
      })})
      file.category = 'csv'
    }else if(fileItem.fileExtension === 'json'){
        // sends the file contents to a worker, and waits for the parsed response
        jsonWorker.postMessage(fileItem.file)
        file.data = await new Promise(resolve => {
          jsonWorker.onmessage = message => {
            resolve(message.data)
          }
        })
        file.category = 'json'
    } else if(fileItem.filename.match(/^WhatsApp Chat with .*?.txt$/)){
      const [,recipient] = fileItem.filename.match(/^WhatsApp Chat with (.*?).txt$/)
      file.data = await fileItem.file.text().then(t=> {
        const messages = parseWhatsAppChatHistory(t)
        console.log(messages.length, 'messages with', recipient)
        return convertWhatsappHistoryToVaadinMessages(messages)
      })
      file.title = `WhatsApp ${recipient}`
      file.category = 'messages'
    }
    else{
      console.log('Removing unrecognised file', fileItem.filename)
      pond.removeFile(fileItem)
      return
    }
    files = [...files, file]
  }
  function handleRemoveFile(err, fileItem){
    files = files.filter(v=>v.name!==fileItem.filename, files.length)
  }

</script>

<div class="file-uploader">
  <FilePond bind:this={pond} {name}
            allowMultiple={true}
            onaddfile={handleAddFile}
            onremovefile={handleRemoveFile}
            credits={false}
            labelIdle='Drag & Drop your CSV files or <span class="filepond--label-action"> Browse </span>'
  />

</div>


<style global>
    @import 'filepond/dist/filepond.css';
    @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>