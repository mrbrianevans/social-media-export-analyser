<script lang="ts">
  import logo from './assets/svelte.png'
  import DataTable from './components/DataTable.svelte'
  import FileUploader from './components/FileUploader.svelte'
  let data
</script>


<svelte:head>
  <title>CSV viewer</title>
</svelte:head>

<main>
  <h1>CSV viewer</h1>
  <FileUploader bind:data />
  <DataTable data={data}/>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>
