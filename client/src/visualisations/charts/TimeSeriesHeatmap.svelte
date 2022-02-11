<script lang='ts'>
  import SvelteHeatmap from 'svelte-heatmap'
  import type { TimeSeries } from '../../../../lib/common/TimeSeriesAnalysis'

  export let data: TimeSeries['metadata']
  let heatmapData: { date: string, value: number }[], years: number[]
  $: {
    if (data) {
      heatmapData = Object.entries(data.date).map(([date, value]) => ({ date, value }))
      years = Object.keys(data.year).map(year => parseInt(year))
    }
  }
  let horizontalLayout
  $: horizontalLayout?.setAttribute('theme', 'padding spacing')
  let year = new Date(data?.metadata.start).getFullYear()
  const charWeekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const partWeekdays = ['Sun', 'Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat']
  const fullWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const partMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
</script>

<vaadin-tabs>
  {#each years as y}
    <vaadin-tab on:click={()=>year=y}>{y}</vaadin-tab>
  {/each}
</vaadin-tabs>
<div class='heatmapContainer'>
  <SvelteHeatmap startDate={new Date(year, 0, 1)} endDate={new Date(year+1, 0, 0)}
                 data={heatmapData} view='weekly'

                 colors={['VAR(--lumo-primary-color-50pct)','VAR(--lumo-primary-color)']}
                 dayLabels={charWeekdays} dayLabelWidth={10}
                 fontColor='VAR(--lumo-secondary-text-color)'
                 fontFamily='VAR(--lumo-font-family)'
                 fontSize='8'
                 emptyColor='VAR(--lumo-contrast-5pct)'
                 monthLabels={fullMonths} monthLabelHeight={10}
  />
</div>


<style>
    .heatmapContainer {
        padding: 0 1rem 1rem 0;
    }
</style>
