<script lang="ts">
  import logo from './assets/svelte.png'
  import DataTable from './components/DataTable.svelte'
  import FileUploader from './components/FileUploader.svelte'
  // import JsonEditor from './components/JsonEditor.svelte'
  //
  // import { compileJSONPointer } from '/node_modules/immutable-json-patch/lib/esm/index.js?v=149adca5'
  // import jsonSourceMap from '/node_modules/json-source-map/index.js?v=149adca5'
  // import jsonrepair from '/node_modules/jsonrepair/lib/esm/jsonrepair.js?v=149adca5'
  // import { isObject } from '/node_modules/svelte-jsoneditor/utils/typeUtils.js'
  // let files = []

  function handleFileSelect(evt) {
    const files = evt.target.files; // FileList object

    // use the 1st file from the list
    let f = files[0];

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        console.log(e, theFile)
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
  }
</script>


<svelte:head>
  <title>Social Media data portability visualiser</title>
</svelte:head>

<main>
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript Svelte!</h1>

  <input type='file' on:input={handleFileSelect}/>
<!--  <ol>-->
<!--    {#each files as file}-->
<!--      <li>{file.name} {JSON.stringify(file)}</li>-->
<!--    {/each}-->
<!--  </ol>-->
  <FileUploader />
<!--  <JsonEditor/>-->
  <DataTable/>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>
