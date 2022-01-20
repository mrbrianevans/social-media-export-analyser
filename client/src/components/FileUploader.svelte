<script lang='ts'>
  import FilePond, { registerPlugin } from 'svelte-filepond'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  import ProcessingWorker from '../workers/processingWorker?worker'
  import type { PostProcessedOutput } from '../../../lib/typedefs/PostProcess'
  import { onlyFilename } from '../../../lib/common/PathProcessing'
  // Register the plugins
  // registerPlugin(FilePondPluginImagePreview)

  // a reference to the component, used to call FilePond methods
  let pond
  // pond.getFiles() will return the active files

  // the name to use for the internal file input
  let name = 'filepond'
  export let files: PostProcessedOutput[] = []

  async function handleAddFile(err, fileItem) {
    // console.log('Relative path', fileItem.relativePath)
    // console.log('fileItem', fileItem)
    const worker = new ProcessingWorker()

    worker.postMessage(fileItem.file)
    console.dir(fileItem)
    const workerOutput: PostProcessedOutput = await new Promise(resolve => {
      worker.onmessage = message => {
        resolve(message.data)
      }
    })
    console.log('metadata', workerOutput.metadata)
    if(workerOutput.metadata.isMedia)
      sessionStorage.setItem(onlyFilename(fileItem.relativePath || fileItem.filename), workerOutput.data.url)
    else files = [...files, workerOutput]
  }

  function handleRemoveFile(err, fileItem) {
    files = files.filter(v => v.metadata.filename !== fileItem.filename)
  }

</script>

<div class='file-uploader'>
  <FilePond allowMultiple={true} bind:this={pond}
            credits={false}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action"> Browse </span>'
            {name}
            onaddfile={handleAddFile}
            onremovefile={handleRemoveFile}
  />

</div>


<style global>
    @import 'filepond/dist/filepond.css';
    @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

    .file-uploader {
        background: var(--lumo-contrast-10pct);
    }

    /* styling overrides for the file upload component */

    .filepond--root {
        max-height: 10em;
        font-family: var(--lumo-font-family);
    }

    .filepond--panel-root {
        background-color: transparent;
        border-radius: 0;
    }

    .filepond--drop-label {
        color: var(--lumo-primary-text-color);
    }

    .filepond--label-action {
        text-decoration-color: var(--lumo-primary-text-color);
    }

    .filepond--item-panel {
        background-color: transparent;
        border: 2px solid var(--lumo-contrast-50pct)
    }

    .filepond--item {
        width: calc(50% - 0.5em);
    }

    /* the background color of the drop circle */
    .filepond--drip-blob {
        background-color: var(--lumo-contrast-90pct);
    }

    /* the background color of the black action buttons */
    .filepond--file-action-button {
        background-color: var(--lumo-contrast-10pct);
    }

    /* the icon color of the black action buttons */
    .filepond--file-action-button {
        color: var(--lumo-contrast);
    }

    /* the text color of the file status and info labels */
    .filepond--file {
        color: var(--lumo-contrast);
    }
</style>