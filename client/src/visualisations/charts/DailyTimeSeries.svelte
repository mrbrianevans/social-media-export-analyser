<script lang='ts'>
  import '@vaadin/button'
  import FusionCharts from 'fusioncharts'
  import Timeseries from 'fusioncharts/fusioncharts.timeseries'
  import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
  import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel'
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts'
  import type { TimeSeriesMetadata } from '../../../../lib/common/TimeSeriesAnalysis'
  import { theme } from '../../stores/themeStore'
  import { onDestroy } from 'svelte'

  fcRoot(FusionCharts, Timeseries, GammelTheme, CandyTheme)

  export let data: TimeSeriesMetadata['date']
  export let label: string
  const title = label + ' per day'
  const fusionDataStore = new FusionCharts.DataStore()
  const fusionTable = fusionDataStore.createDataTable(Object.entries(data), [
    {
      'name': 'Date',
      'type': 'date',
      'format': '%Y-%m-%d'
    },
    {
      'name': title,
      'type': 'number'
    }
  ])
  let dataSource = {
      'caption': { text: title },
      'chart': {
        'subCaption': 'Aggregated by day',
        'theme': $theme === 'dark' ? 'candy' : 'gammel'
      },
      yAxis: [
        {
          plot: {
            value: title,
            type: 'column'
          },
          title
        }
      ],
      'data': fusionTable
    },
    chartConfig = {
      type: 'timeseries',
      width: '100%',
      height: '500', // in pixels
      renderAt: 'ts-chart-container',
      dataSource
    }

  let chart
  const themeUnsub = theme.subscribe(value => {
    chart?.setChartAttribute('theme', value === 'dark' ? 'candy' : 'fusion')
  })
  onDestroy(themeUnsub)
</script>

<div id='ts-chart-container'>
  <SvelteFC {...chartConfig} bind:chart />
</div>


<style>
    #ts-chart-container {
        height: 500px;
    }
</style>
