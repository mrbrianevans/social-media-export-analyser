<script lang='ts'>
  import FileUploader from './components/FileUploader.svelte'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import '@vaadin/tabs'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js'
  import { theme } from './stores/themeStore'
  import FileViewer from './components/FileViewer.svelte'
  import Navbar from './components/Navbar.svelte'

  let files: PostProcessedOutput[] = []
  let activeIndex = 0

</script>


<main theme={$theme}>
  <vaadin-app-layout>

    <div slot='navbar' style='width: 100%'>
      <Navbar />
    </div>
    <!-- file upload area -->
    <div slot='drawer'>
      <FileUploader bind:files />
    </div>
    <!-- file tab selectors -->
    <div slot='drawer'>
      <vaadin-tabs class='file-explorer-tabs' orientation='vertical'>
        {#each files as file, index}
          <vaadin-tab>
            <span tabindex='-1' on:click={()=>activeIndex=index}>{file.title}</span>
          </vaadin-tab>
        {/each}
      </vaadin-tabs>
    </div>

    {#each files as file, index}
      {#if index === activeIndex}
        <FileViewer file={file} />
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style>
    main {
        height: 100vh;
    }

    .file-explorer-tabs {
        /* this makes the height half of the side bar */
        height: CALC((100vh - 2 * var(--lumo-font-size-xl)) / 2 - 0.5rem);
        margin: 0;
        padding: 0;
    }

    :global(body) {
        margin: 0;
    }

</style>
