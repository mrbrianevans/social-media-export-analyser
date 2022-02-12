<script lang='ts'>
  import SvelteHeatmap from 'svelte-heatmap'
  import type { TimeSeries } from '../../../../lib/common/TimeSeriesAnalysis'
  import { onMount } from 'svelte'
  import { createFileDownload, createSvgDownload, revokeFileDownload } from '../../utils/createFileDownload'

  export let exportUrl: string = ''
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
  let heatmapContainer: HTMLDivElement
  $: {
    // can't do this because it creates a circular dependency on exportUrl
    // if(exportUrl) {
    //   revokeFileDownload(exportUrl)
    //   // exportUrl = ''
    // }
    setTimeout(() => {
      console.log('New url genned')
      const svg = Array.from(heatmapContainer?.children ?? []).find(c => c.tagName.toLowerCase() === 'svg')
      if (svg) exportUrl = createSvgDownload(svg.outerHTML)
    }, year / 100) // delay to wait for SVG to be rendered, and depend on changes to year
  }
</script>

<vaadin-tabs>
  {#each years as y}
    <vaadin-tab on:click={()=>year=y}>{y}</vaadin-tab>
  {/each}
</vaadin-tabs>
<div class='heatmapContainer' bind:this={heatmapContainer}>
  <!--  default css variable values are for when the SVG is exported  -->
  <SvelteHeatmap startDate={new Date(year, 0, 1)} endDate={new Date(year+1, 0, 0)}
                 data={heatmapData} view='weekly'

                 colors={['VAR(--lumo-primary-color-50pct,hsl(214, 90%, 48%))','VAR(--lumo-primary-color,hsla(214, 90%, 70%, 0.69))']}
                 dayLabels={charWeekdays} dayLabelWidth={10}
                 fontColor='VAR(--lumo-secondary-text-color, hsla(214, 28%, 13%, 0.7))'
                 fontFamily='VAR(--lumo-font-family, sans-serif)'
                 fontSize='8'
                 emptyColor='VAR(--lumo-contrast-10pct, hsla(214, 60%, 80%, 0.14))'
                 monthLabels={fullMonths} monthLabelHeight={10}
  />
</div>


<style>
    .heatmapContainer {
        padding: 0 1rem 1rem 0;
    }
</style>
