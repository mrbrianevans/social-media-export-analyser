<script lang="ts">
  import FilePond, { registerPlugin, supported } from 'svelte-filepond';
  import * as papa from 'papaparse'
  // Import the Image EXIF Orientation and Image Preview plugins
  // Note: These need to be installed separately
  // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  import type { ParseResult } from 'papaparse'

  // Register the plugins
  registerPlugin( FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;
  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond';

  // handle filepond events
  function handleInit() {
    console.log('FilePond has initialised');
  }
  export let data
  function handleAddFile(err, fileItem) {
    console.log('A file has been added', fileItem);
    if(fileItem.fileExtension !== 'csv') return pond.removeFile()
    console.time('Read file '+ fileItem.filename)
    papa.parse(fileItem.file, {complete(results, file) {
        console.timeEnd('Read file '+ fileItem.filename)
        data = results.data
      }, header: true, worker: true})
  }
  function handleRemoveFile(err, fileItem){
    data = null
  }

</script>

<div class="file-uploader">
  <FilePond bind:this={pond} {name}
            allowMultiple={false}
            oninit={handleInit}
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