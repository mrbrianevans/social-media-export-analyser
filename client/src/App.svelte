<script lang="ts">
  import FileUploader from './components/FileUploader.svelte'
  import { ComponentForShape } from './components/ComponentMap'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import '@vaadin/vaadin-tabs/vaadin-tabs.js'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
  import '@vaadin/vaadin-button/theme/material/vaadin-button';
  import '@vaadin/horizontal-layout/theme/material/vaadin-horizontal-layout';
  import VaadinGrid from './visualisations/grids/VaadinGrid.svelte'
  import ThemeToggle from './components/ThemeToggle.svelte'
  let files: PostProcessedOutput[] = []
  let activeIndex = 0
  let theme
</script>


<main theme={theme}>
  <vaadin-app-layout>
    <vaadin-horizontal-layout slot="navbar" theme="" style='justify-content: space-between; width: 100%; align-items: center'>
      <h1 class='navbar-title'>Social media data viewer</h1>
      <ThemeToggle bind:theme/>
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
        {#if file.component === 'VaadinGrid'}
          <VaadinGrid data={file.data}/>
        {/if}
        <svelte:component this={ComponentForShape[file.component]} data={file.data} maxItems={10}/>
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style>
  main{
      min-height: 100vh;
  }

  h1.navbar-title{
      display: inline-block;
      font-size: var(--lumo-font-size-xl);
      margin: 0 var(--lumo-space-l);
  }

  :global(body){
      margin: 0;
  }

</style>
