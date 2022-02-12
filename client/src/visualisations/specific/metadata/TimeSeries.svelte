<script lang='ts'>

  import '@vaadin/horizontal-layout'
  import '@vaadin/button'
  import type { TimeSeriesMetadata } from '../../../../../lib/common/TimeSeriesAnalysis'
  import DailyTimeSeries from '../../charts/DailyTimeSeries.svelte'
  import DayOfWeekPie from '../../charts/DayOfWeekPie.svelte'
  import FusionCharts from 'fusioncharts'
  import TimeSeriesHeatmap from '../../charts/TimeSeriesHeatmap.svelte'

  export let data: TimeSeriesMetadata

  const exportHandler = format => () => {
    FusionCharts.batchExport({
      exportFormat: format
    })
  }
  let horizontalLayout
  $: horizontalLayout?.setAttribute('theme', 'margin spacing')
  let heatmapUrl
  let exportUrl: string = ''
</script>


<vaadin-horizontal-layout bind:this={horizontalLayout}>
  <vaadin-button on:click={exportHandler('pdf')}>Export charts to PDF</vaadin-button>
  <vaadin-button on:click={exportHandler('png')}>Export charts to PNG</vaadin-button>
  <vaadin-button on:click={exportHandler('jpg')}>Export charts to JPG</vaadin-button>
</vaadin-horizontal-layout>

<DailyTimeSeries data={data.date} label={data.metadata.label} />

<DayOfWeekPie data={data.weekday} label={data.metadata.label} />
<hr />
<h4>{data.metadata.label} per year
  {#if heatmapUrl?.length > 0}
    <vaadin-button><a href={heatmapUrl} download={data.metadata.label+' heatmap chart.svg'}>Export chart as SVG</a>
    </vaadin-button>
  {/if}
</h4>
<TimeSeriesHeatmap data={data} bind:exportUrl={heatmapUrl} />
