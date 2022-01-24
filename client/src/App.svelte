<script lang='ts'>
  import FileUploader from './components/FileUploader.svelte'
  import { ComponentForShape } from './components/ComponentMap'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import '@vaadin/tabs'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js'
  import '@vaadin/button'
  import '@vaadin/horizontal-layout/theme/material/vaadin-horizontal-layout'
  import ThemeToggle from './components/ThemeToggle.svelte'
  import GitHubLink from './components/GitHubLink.svelte'
  import OnlineIndicator from './components/OnlineIndicator.svelte'
  import { Document } from 'flexsearch'
  import { objectKeys } from '../../lib/common/ArrayUtils'

  let files: PostProcessedOutput[] = []
  let activeIndex = 0
  let theme
  let query: string, results: any[], idx: Document<any, false>
  $: {
    if (query) {
      console.time('Query '+query)
      results = idx.search(query, { enrich: true, suggest: true  })
      console.timeEnd('Query '+query)
    }else results = null
  }
  async function loadIndex(data){
    if(!data) return
    console.time('Load index')
    const fields = objectKeys(data)
    console.log('Indexing', fields)
    idx = new Document({document: {id: 'id', index: fields}, worker: true, preset: 'performance', tokenize: 'strict'})
    if(data instanceof Array){
      for (const id in data) {
        const dataItem = {id, ...data[id]}
        // await idx.addAsync(id, dataItem)
        idx.add(dataItem)
      }
    }else{
      await idx.addAsync(0, data)
    }
    console.log('Loaded data into index')

    console.timeEnd('Load index')
  }
  $: {
    console.log('Active index changed', activeIndex)
    loadIndex(files[activeIndex]?.data)
  }
</script>


<main theme={theme}>
  <vaadin-app-layout>
    <vaadin-horizontal-layout slot='navbar' style='justify-content: space-between; width: 100%; align-items: center'
                              theme=''>
      <h1 class='navbar-title'>Social media data viewer</h1>
      <vaadin-horizontal-layout>
        <OnlineIndicator/>
        <GitHubLink/>
        <ThemeToggle bind:theme />
      </vaadin-horizontal-layout>
    </vaadin-horizontal-layout>
    <FileUploader bind:files />
    <!--  tab selectors -->
    <vaadin-tabs orientation='vertical' slot='drawer'>
      {#each files as file, index}
        <vaadin-tab>
          <span tabindex='-1' on:click={()=>activeIndex=index}>{file.title}</span>
        </vaadin-tab>
      {/each}
    </vaadin-tabs>
    {#each files as file, index}
      {#if index === activeIndex}
        {#if file.data instanceof Array}
          <input bind:value={query}/>
        {/if}
        <svelte:component this={ComponentForShape[file.component]}
                          data={file.data instanceof Array ? file.data.filter((d, i)=>!results?.length || (results?.some(r=>r.result.includes(i.toString()))??true)):file.data} maxItems={100} />
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style>
    main {
        min-height: 100vh;
    }

    h1.navbar-title {
        display: inline-block;
        font-size: var(--lumo-font-size-xl);
        margin: 0.25rem var(--lumo-space-l);
    }

    :global(body) {
        margin: 0;
    }

</style>
