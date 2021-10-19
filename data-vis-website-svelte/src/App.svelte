<script lang="ts">
  import DataTable from './components/DataTable.svelte'
  import FileUploader from './components/FileUploader.svelte'
  let data
  let dataTitle: string = ''
</script>


<svelte:head>
  <title>CSV & JSON viewer</title>
</svelte:head>

<main>
  <h1>CSV & JSON viewer</h1>
  <FileUploader bind:data  bind:dataTitle/>
  <h2>{dataTitle}</h2>
  <DataTable data={data}/>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>
