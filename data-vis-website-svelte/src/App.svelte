<script lang="ts">
  import DataTable from './components/DataTable.svelte'
  import FileUploader from './components/FileUploader.svelte'
  import MessageHistory from './visualisations/chats/MessageHistory.svelte'
  import type { FileItem } from './types/FileItem'
  import JsonEditor from './components/JsonEditor.svelte'
  let files: FileItem[] = []
  let activeIndex = 0
  let componentMap = {csv: DataTable, json: JsonEditor, messages: MessageHistory}
</script>


<svelte:head>
  <title>Social media data viewer</title>
</svelte:head>

<main>
  <h1>Social media data viewer</h1>
  <FileUploader bind:files/>
<!--  tab selectors -->
  {#each files as file, index}
    <button on:click={()=>activeIndex=index}>{file.title ?? file.name}</button>
  {/each}

<!-- selected tab content -->
  {#each files as file, index}
    {#if index === activeIndex}
      <h2>{file.title ?? file.name}</h2>
      <svelte:component this={componentMap[file.category]} data={file.data} maxItems={10}/>
    {/if}
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

</style>
