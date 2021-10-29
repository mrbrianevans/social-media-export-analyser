<script lang="ts">
  import '@vaadin/grid/vaadin-grid.js';
  import '@vaadin/grid/vaadin-grid-column';
  import '@vaadin/grid/vaadin-grid-sort-column';
  import { onMount } from 'svelte'
  export let data

  let items: any[] = []
  let grid
  let mounted = false
  $: if(mounted){
    grid.items = items
  }
  onMount(()=>mounted = true)

  const getGridData = (d:any):[]=> {
    if(d instanceof Array) return d
    for (const key in d) {
      if(d[key] instanceof Array && d[key].length) return d[key]
    }
    console.log('Couldnt find any array data in vaadin grid')
  }
  $: items = getGridData(data)
  let columns = []
  const getColumns = i => {
    return i ? Object.keys(i[0]) : []
  }
  $: columns = getColumns(items)
</script>

<vaadin-grid theme="compact" column-reordering-allowed multi-sort bind:this={grid}>
  {#each columns as column}
    <vaadin-grid-sort-column auto-width path={column} resizable></vaadin-grid-sort-column>
  {/each}
</vaadin-grid>