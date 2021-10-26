<script lang="ts">
  import FilePond, { registerPlugin } from 'svelte-filepond';
  import * as papa from 'papaparse'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  import ProcessingWorker from '../workers/processingWorker?worker'
  import type { FileItem } from '../types/FileItem'
  import type { PostProcessedOutput } from '../../../lib/typedefs/PostProcess'
  // Register the plugins
  registerPlugin( FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;
  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond';
  export let files: PostProcessedOutput[] = []
  async function handleAddFile(err, fileItem) {
    console.log('Relative path', fileItem.relativePath)
    console.log('fileItem', fileItem)
    const worker = new ProcessingWorker()

    worker.postMessage(fileItem.file)
    const workerOutput: PostProcessedOutput = await new Promise(resolve => {
      worker.onmessage = message => {
        resolve(message.data)
      }
    })
    console.log('metadata:', workerOutput.metadata)
    files = [...files, workerOutput]
  }
  function handleRemoveFile(err, fileItem){
    files = files.filter(v=>v.metadata.filename !== fileItem.filename)
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