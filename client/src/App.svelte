<script lang="ts">
  import FileUploader from './components/FileUploader.svelte'
  import { ComponentForShape } from './components/ComponentMap'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import '@vaadin/vaadin-tabs/vaadin-tabs.js'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
  import '@vaadin/vaadin-button/theme/material/vaadin-button';
  import '@vaadin/horizontal-layout/theme/material/vaadin-horizontal-layout';
  let files: PostProcessedOutput[] = []
  let activeIndex = 0
  let darkTheme = false
</script>


<main theme={darkTheme ? 'dark':'light'}>
  <vaadin-app-layout>
    <vaadin-horizontal-layout slot="navbar" theme="" style='justify-content: space-between; width: 100%; align-items: center'>
      <h1 class='navbar-title' style='display: inline-block'>Social media data viewer</h1>
      <vaadin-tabs>
        <vaadin-tab>
          <a tabindex="-1" href='/'>View data</a>
        </vaadin-tab>
        <vaadin-tab>
          <a tabindex="-1" href='about'>About</a>
        </vaadin-tab>
      </vaadin-tabs>
      <vaadin-button on:click={()=>darkTheme = !darkTheme}>theme</vaadin-button>
    </vaadin-horizontal-layout>
    <FileUploader bind:files/>
    <!--  tab selectors -->
    <vaadin-tabs>
      {#each files as file, index}
        <vaadin-tab>
          <a tabindex="-1" on:click={()=>activeIndex=index}>{file.title}</a>
        </vaadin-tab>
      {/each}
    </vaadin-tabs>
    <!-- selected tab content -->
    {#each files as file, index}
      {#if index === activeIndex}
        <svelte:component this={ComponentForShape[file.componentName]} data={file.data} maxItems={10}/>
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style >
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1.navbar-title{
      font-size: var(--lumo-font-size-l);
      margin: 0 var(--lumo-space-l);
  }

  :global(.filepond--root) {
    max-height: 10em;
      font-family: var(--lumo-font-family);
  }

  :global(.filepond--panel-root) {
      background-color: var(--lumo-contrast-10pct);
  }
  :global(.filepond--drop-label) {
      color: var(--lumo-primary-text-color);
  }
  :global(.filepond--label-action) {
    text-decoration-color: var(--lumo-primary-text-color);
  }
  :global(.filepond--item-panel) {
      background-color: var(--lumo-contrast-50pct);
  }
  :global(.filepond--item) {
      width: calc(50% - 0.5em);
  }
  /* the background color of the drop circle */
  :global(.filepond--drip-blob) {
      background-color: var(--lumo-contrast-90pct);
  }

  /* the background color of the black action buttons */
  :global(.filepond--file-action-button) {
      background-color: var(--lumo-primary-color-10pct);
  }

  /* the icon color of the black action buttons */
  :global(.filepond--file-action-button) {
      color: var(--lumo-contrast);
  }

  /* the text color of the file status and info labels */
  :global(.filepond--file) {
      color: var(--lumo-contrast);
  }

</style>
