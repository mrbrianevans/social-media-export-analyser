<script lang='ts'>
  import '@vaadin/button'
  import FusionCharts from 'fusioncharts'
  import Timeseries from 'fusioncharts/fusioncharts.timeseries'
  import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts'
  import { TimeSeriesMetadata } from '../../../../lib/common/TimeSeriesAnalysis'
  import { theme } from '../../stores/themeStore'
  import { onDestroy } from 'svelte'

  fcRoot(FusionCharts, Timeseries, FusionTheme, CandyTheme)

  export let data: TimeSeriesMetadata
  const fusionDataStore = new FusionCharts.DataStore()
  const fusionTable = fusionDataStore.createDataTable(Object.entries(data.date), [
    {
      'name': 'Date',
      'type': 'date',
      'format': '%Y-%m-%d'
    },
    {
      'name': data.metadata.label,
      'type': 'number'
    }
  ])
  let dataSource = {
      'caption': { text: data.metadata.label },
      'chart': {
        'subCaption': 'Aggregated by day',
        'theme': $theme === 'dark' ? 'candy' : 'fusion'
      },
      yAxis: [
        {
          plot: {
            value: data.metadata.label,
            type: 'column'
          },
          title: data.metadata.label + ' per day'
        }
      ],
      'data': fusionTable
    },
    chartConfig = {
      type: 'timeseries',
      width: '100%',
      height: '500', // in pixels
      renderAt: 'chart-container',
      dataSource
    }
  const exportHandler = () => {
    FusionCharts.batchExport({
      exportFormat: 'pdf'
    })
  }
  let chart
  const themeUnsub = theme.subscribe(value => {
    chart?.setChartAttribute('theme', value === 'dark' ? 'candy' : 'fusion')
  })
  onDestroy(themeUnsub)
</script>

<div id='chart-container'>
  <SvelteFC {...chartConfig} bind:chart />
</div>
<div style='text-align: center; padding-top: 5px;'>
  <vaadin-button on:click={exportHandler}>Export charts to PDF</vaadin-button>
</div>
