<script lang='ts'>

  import '@vaadin/horizontal-layout'
  import '@vaadin/text-field'
  import '@vaadin/icons'
  import FrequencyTableTabs from '../visualisations/specific/metadata/FrequencyTableTabs.svelte'
  import JsonEditor from './JsonEditor.svelte'
  import { ComponentForShape } from './ComponentMap'
  import { Document } from 'flexsearch'
  import { initialiseWasm } from 'fast-topics'
  import { objectKeys } from '../../../lib/common/ArrayUtils'
  import topicsWasm from 'fast-topics/dist/topics.wasm?url'
  import ContentTabs from '../visualisations/layouts/ContentTabs.svelte'
  import TimeSeries from '../visualisations/specific/metadata/TimeSeries.svelte'

  export let file
  // limit to first 5000 results
  const searchResultsLimit = 5000

  let query: string = '', results: any[], idx: Document<any, false>
  $: {
    if (query) {
      // console.time('Query '+query)
      results = idx.search({ limit: searchResultsLimit, query, enrich: true, suggest: true })
      // console.timeEnd('Query '+query)
    } else results = null
  }

  let currData
  $: {
    if (query && results) {
      // optimised for performance. Using Set() for unique results. 5ms for 10,000 results
      const resultIds = new Set()
      const duplicateIds = results?.flatMap((field) => field.result), numDupIds = duplicateIds.length
      for (let i = 0; i < numDupIds; i++) resultIds.add(duplicateIds[i])
      currData = Array.from(resultIds.values()).map(i => file?.data[i]).filter(d => d)
    } else {
      currData = null
    }
    if (!currData) currData = file?.data
  }
  initialiseWasm(topicsWasm).then(() => console.log('WASM ready'))

  // $: if(files?.length) console.log(files.map(f=>f.title), getTopics(files.map(file=>file.title)))
  async function loadIndex(data) {
    if (!data) return
    console.time('Load index')
    const fields = objectKeys(data)
    idx = new Document({ document: { id: 'id', index: fields }, preset: 'performance', tokenize: 'full' })
    if (data instanceof Array) {
      console.time('Add items to index')
      for (const id in data) {
        const dataItem = { ...data[id] }
        dataItem.id ??= id
        delete dataItem.id
        // await idx.addAsync(dataItem.id, dataItem)
        idx.add(id, dataItem)
      }
      console.timeEnd('Add items to index')
    } else {
      console.time('Add item to index')
      await idx.addAsync(0, data)
      console.timeEnd('Add item to index')
    }
    console.timeEnd('Load index')
  }

  $: {
    loadIndex(file?.data)
  }
  let tabs = [{
    label: 'Main',
    component: ComponentForShape[file.component],
    props: { data: file.data }
  },
    file.metadata.freq && {
      label: 'Frequency tables',
      component: FrequencyTableTabs,
      props: { data: file.metadata.freq }
    },
    file.metadata.ts && { label: 'Time series', component: TimeSeries, props: { data: file.metadata.ts } },
    { label: 'Raw JSON data', component: JsonEditor, props: { data: file.data } }
  ].filter(d => d)
  $: tabs[0].props.data = currData
  let horizontalLayout
  $: horizontalLayout?.setAttribute('theme', 'margin spacing')
  let selectedTab = 0
</script>

<div>

  {#if selectedTab === 0 && file.data instanceof Array}
    <!-- theme="margin" doesn't get rendered, so margin is added with inline styles -->
    <vaadin-horizontal-layout style='align-items: center' bind:this={horizontalLayout}>
      <vaadin-text-field value={query} aria-label='search' placeholder='Search' clear-button-visible
                         on:input={v=>query = v.target.value}>
        <vaadin-icon icon='vaadin:search' slot='prefix'></vaadin-icon>
      </vaadin-text-field>
      <span theme={currData.length ? 'badge' : 'badge error'} style='margin: 0 var(--lumo-space-s)'>
              {currData.length}{currData.length === searchResultsLimit ? `+` : ''} items
            </span>
    </vaadin-horizontal-layout>

  {/if}

  <ContentTabs tabs={tabs} bind:selectedTab />

</div>


<style>

</style>
