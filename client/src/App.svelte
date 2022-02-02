<script lang='ts'>
  import FileUploader from './components/FileUploader.svelte'
  import { ComponentForShape } from './components/ComponentMap'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import '@vaadin/tabs'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js'
  import '@vaadin/text-field';
  import '@vaadin/icons';
  import '@vaadin/horizontal-layout/theme/material/vaadin-horizontal-layout'
  import ThemeToggle from './components/ThemeToggle.svelte'
  import GitHubLink from './components/GitHubLink.svelte'
  import OnlineIndicator from './components/OnlineIndicator.svelte'
  import { Document,  } from 'flexsearch'
  import { objectKeys } from '../../lib/common/ArrayUtils'
  import JsonEditor from './components/JsonEditor.svelte'
  import { getTopics, initialiseWasm } from 'fast-topics'
  import topicsWasm from 'fast-topics/dist/topics.wasm?url'

  // limit to first 5000 results
  const searchResultsLimit = 5000
  let files: PostProcessedOutput[] = []
  let activeIndex = 0
  let theme
  let query: string = '', results: any[], idx: Document<any, false>
  $: {
    if (query) {
      // console.time('Query '+query)
      results = idx.search({limit: searchResultsLimit, query, enrich: true, suggest: true})
      // console.timeEnd('Query '+query)
    }else results = null
  }
  let currData
  $: currData = (query ? results?.flatMap((field)=>field.result).map(i=>files[activeIndex]?.data[i]).filter(d=>d):null) ?? files[activeIndex]?.data
  initialiseWasm(topicsWasm).then(()=>console.log('WASM ready'))
  // $: if(files?.length) console.log(files.map(f=>f.title), getTopics(files.map(file=>file.title)))
  async function loadIndex(data){
    if(!data) return
    console.time('Load index')
    const fields = objectKeys(data)
    idx = new Document({document: {id: 'id', index: fields}, preset: 'performance', tokenize: 'full'})
    if(data instanceof Array){
      console.time('Add items to index')
      for (const id in data) {
        const dataItem = {...data[id]}
        dataItem.id ??= id
        delete dataItem.id
        // await idx.addAsync(dataItem.id, dataItem)
        idx.add(id, dataItem)
      }
      console.timeEnd('Add items to index')
    }else{
      console.time('Add item to index')
      await idx.addAsync(0, data)
      console.timeEnd('Add item to index')
    }
    console.timeEnd('Load index')
  }
  $: {
    loadIndex(files[activeIndex]?.data)
  }
</script>


<main theme={theme}>
  <vaadin-app-layout>
    <vaadin-horizontal-layout slot='navbar' style='justify-content: space-between; width: 100%; align-items: center'
                              theme=''>
      <h1 class='navbar-title'><img src='icon/icon500.webp' style='height: 2em; width: 2em' alt='logo'/>Data File Explorer</h1>
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
          <!-- theme="margin" doesn't get rendered, so margin is added with inline styles -->
          <vaadin-horizontal-layout theme="margin spacing" style='margin: 0 var(--lumo-space-m); align-items: center'>
            <vaadin-text-field value={query} aria-label="search" placeholder="Search" clear-button-visible on:input={v=>query = v.target.value}>
              <vaadin-icon icon="vaadin:search" slot="prefix"></vaadin-icon>
            </vaadin-text-field>
            <span theme={currData.length ? 'badge' : 'badge error'} style='margin: 0 var(--lumo-space-s)'>
              {currData.length}{currData.length === searchResultsLimit ? `+`:''} items
            </span>
          </vaadin-horizontal-layout>

        {/if}
<!--        <JsonEditor data={(query ? results?.flatMap((field)=>field.result).map(i=>file.data[i]):null) ?? file.data} />-->
        <svelte:component this={ComponentForShape[file.component]}
                          data={currData} />
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style>
    main {
        min-height: 100vh;
    }

    h1.navbar-title {
        display: inline-flex;
        font-size: var(--lumo-font-size-xl);
        margin: 0.25rem var(--lumo-space-s);
        align-items: center;
    }

    :global(body) {
        margin: 0;
    }

</style>
