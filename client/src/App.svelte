<script lang="ts">
  import FileUploader from './components/FileUploader.svelte'
  import { ComponentForShape } from './components/ComponentMap'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import '@vaadin/vaadin-tabs/vaadin-tabs.js'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
  import '@vaadin/vaadin-button/theme/material/vaadin-button';
  import '@vaadin/horizontal-layout/theme/material/vaadin-horizontal-layout';
  import VaadinGrid from './visualisations/grids/VaadinGrid.svelte'
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
    <vaadin-tabs slot="drawer" orientation="vertical">
      {#each files as file, index}
        <vaadin-tab>
          <a tabindex="-1" on:click={()=>activeIndex=index}>{file.title}</a>
        </vaadin-tab>
      {/each}
    </vaadin-tabs>
    <!-- selected tab content -->
    {#each files as file, index}
      {#if index === activeIndex}
        {#if file.componentName === 'VaadinGrid'}
          <VaadinGrid data={file.data}/>
        {/if}
        <svelte:component this={ComponentForShape[file.componentName]} data={file.data} maxItems={10}/>
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1.navbar-title{
      font-size: var(--lumo-font-size-l);
      margin: 0 var(--lumo-space-l);
  }

  :global(body){
      margin: 0;
  }

</style>
