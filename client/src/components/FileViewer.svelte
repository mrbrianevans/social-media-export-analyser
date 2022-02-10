<script lang='ts'>

  import '@vaadin/tabs'
  import FrequencyTableTabs from '../visualisations/specific/metadata/FrequencyTableTabs.svelte'
  import DayOfWeekPie from '../visualisations/charts/DayOfWeekPie.svelte'
  import JsonEditor from './JsonEditor.svelte'
  import DailyTimeSeries from '../visualisations/charts/DailyTimeSeries.svelte'
  import { ComponentForShape } from './ComponentMap'
  import { Document } from 'flexsearch'
  import { initialiseWasm } from 'fast-topics'
  import { objectKeys } from '../../../lib/common/ArrayUtils'
  import topicsWasm from 'fast-topics/dist/topics.wasm?url'

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
</script>

<div>
  <!--  <vaadin-tabs orientation='horizontal'>-->
  <!--    {#each ['Main content', 'Time series', 'Frequency', 'Raw file data', 'Export'] as tab, index}-->
  <!--      <vaadin-tab>-->
  <!--        <span tabindex='-1' on:click={()=>console.log(index)}>{tab}</span>-->
  <!--      </vaadin-tab>-->
  <!--    {/each}-->
  <!--  </vaadin-tabs>-->
  <!-- this needs to be tabs. First tab is main visualisation, then metadata, then export options, then raw data -->

  {#if file.data instanceof Array}
    <!-- theme="margin" doesn't get rendered, so margin is added with inline styles -->
    <vaadin-horizontal-layout theme='margin spacing' style='margin: 0 var(--lumo-space-m); align-items: center'>
      <vaadin-text-field value={query} aria-label='search' placeholder='Search' clear-button-visible
                         on:input={v=>query = v.target.value}>
        <vaadin-icon icon='vaadin:search' slot='prefix'></vaadin-icon>
      </vaadin-text-field>
      <span theme={currData.length ? 'badge' : 'badge error'} style='margin: 0 var(--lumo-space-s)'>
              {currData.length}{currData.length === searchResultsLimit ? `+` : ''} items
            </span>
    </vaadin-horizontal-layout>

  {/if}

  {#if false && file.metadata.freq }
    <FrequencyTableTabs data={file.metadata.freq} />
  {/if}
  {#if false && file.metadata.ts }
    <DailyTimeSeries data={file.metadata.ts} />
    <DayOfWeekPie data={file.metadata.ts} />
    <JsonEditor data={file.metadata} />
  {/if}
  <!--        <JsonEditor data={(query ? results?.flatMap((field)=>field.result).map(i=>file.data[i]):null) ?? file.data} />-->
  <svelte:component this={ComponentForShape[file.component]}
                    data={currData} />
</div>


<style>

</style>
