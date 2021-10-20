<script lang="ts">
  import FilePond, { registerPlugin } from 'svelte-filepond';
  import * as papa from 'papaparse'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  import JsonParser from './jsonParserWorker?worker'
  import {
    convertWhatsappHistoryToVaadinMessages,
    parseWhatsAppChatHistory
  } from '../../../lib/vendors/whatsapp/ChatHistory'
  // Register the plugins
  registerPlugin( FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;
  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond';

  export let data
  export let dataTitle
  const worker = new JsonParser()
  function handleAddFile(err, fileItem) {
    console.log('A file has been added', fileItem);
    if(fileItem.fileExtension === 'csv') {
      console.time('Read file ' + fileItem.filename)
      papa.parse(fileItem.file, {
        complete(results, file) {
          console.timeEnd('Read file ' + fileItem.filename)
          dataTitle = fileItem.filenameWithoutExtension
          data = results.data
        }, header: true, worker: true
      })
    }else if(fileItem.fileExtension === 'json'){
      console.time('File upload to data set')
      fileItem.file.text().then(t=> {
        // sends the file contents to a worker, and waits for the parsed response
        worker.postMessage(t)
        new Promise(resolve => {
          worker.onmessage = message => {
            // console.log(Date(), '[MAIN] Got the parsed object back from worker')
            resolve(message.data)
          }
        }).then((json: Object)=>{
          console.timeEnd('File upload to data set')
          if(json instanceof Array) data = json
          else{
            for (const [key, value] of Object.entries(json)) {
              if(value instanceof Array) {
                dataTitle = `${fileItem.filenameWithoutExtension} ${key}`
                data = value
                return
              }
            }
          }
        })
      })
    } else if(fileItem.filename.match(/^WhatsApp Chat with .*?.txt$/)){
      const [,recipient] = fileItem.filename.match(/^WhatsApp Chat with (.*?).txt$/)
      console.log('Parsing chat with', recipient)
      fileItem.file.text().then(t=> {
        const messages = parseWhatsAppChatHistory(t)
        console.log(messages.length, 'messages with', recipient)
        data = convertWhatsappHistoryToVaadinMessages(messages)
        dataTitle = `WhatsApp Chat with ${recipient}`
      })
    }
    else{
      pond.removeFile()
    }
  }
  function handleRemoveFile(err, fileItem){
    data = null
    dataTitle = ''
  }

</script>

<div class="file-uploader">
  <FilePond bind:this={pond} {name}
            allowMultiple={false}
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