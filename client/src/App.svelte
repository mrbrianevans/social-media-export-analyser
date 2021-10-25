<script lang="ts">
  import FileUploader from './components/FileUploader.svelte'
  import type { FileItem } from './types/FileItem'
  import { ComponentForShape } from './components/ComponentMap'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  let files: PostProcessedOutput[] = []
  let activeIndex = 0
</script>

<main>
  <h1>Social media data viewer</h1>
  <FileUploader bind:files/>
<!--  tab selectors -->
  {#each files as file, index}
    <button on:click={()=>activeIndex=index}>{file.title}</button>
  {/each}

<!-- selected tab content -->
  {#each files as file, index}
    {#if index === activeIndex}
      <h2>{file.title}</h2>
      <svelte:component this={ComponentForShape[file.componentName]} data={file.data} maxItems={10}/>
    {/if}
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
