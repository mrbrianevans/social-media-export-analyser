<script lang="ts">
  import FilePond, { registerPlugin } from 'svelte-filepond';
  import * as papa from 'papaparse'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

  // Register the plugins
  registerPlugin( FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;
  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond';

  export let data
  export let dataTitle

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
      fileItem.file.text().then(t=> {
        const json = JSON.parse(t)
        if(json instanceof Array) data = json
        else{
          for (const [key, value] of Object.entries(json)) {
            if(value instanceof Array) {
              dataTitle = fileItem.filenameWithoutExtension + ' ' + key
              data = value
              return
            }
          }
        }
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