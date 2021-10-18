<style global>
    @import 'filepond/dist/filepond.css';
    @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>

<script>
  import FilePond, { registerPlugin, supported } from 'svelte-filepond';

  // Import the Image EXIF Orientation and Image Preview plugins
  // Note: These need to be installed separately
  // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

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

  function handleAddFile(err, fileItem) {
    console.log('A file has been added', fileItem);
  }
</script>

<div class="file-uploader">
<p>File Upload facility</p>
  <input type='file' on:input={e=>console.log(e.target.files[0])}/>

<!--  <FilePond bind:this={pond} {name}-->
<!--            server="/api"-->
<!--            allowMultiple={true}-->
<!--            oninit={handleInit}-->
<!--            onaddfile={handleAddFile}/>-->

</div>
