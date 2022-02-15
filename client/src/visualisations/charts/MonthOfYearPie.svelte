<script lang='ts'>
  import FusionCharts from 'fusioncharts'
  import Charts from 'fusioncharts/fusioncharts.charts'
  import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
  import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel'
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts'
  import type { TimeSeriesMetadata } from '../../../../lib/common/TimeSeriesAnalysis'
  import {
    theme
  } from '../../stores/themeStore'
  import { onDestroy } from 'svelte'

  fcRoot(FusionCharts, Charts, GammelTheme, CandyTheme)
  let chart
  // data from TimeSeries
  export let data: TimeSeriesMetadata['monthName']
  export let label: string
  let dataSource = {
      'chart': {
        'caption': label,
        'subCaption': 'Aggregated by month',
        'showValues': '1',
        'showPercentInTooltip': '0',
        'enableMultiSlicing': '1',
        'theme': $theme === 'dark' ? 'candy' : 'gammel'
      },
      'data': Object.entries(data).map(([label, value]) => ({ label, value }))
    },
    chartConfig = {
      type: 'pie2d',
      width: '100%',
      height: '500', // in pixels
      renderAt: 'month-pie-chart-container',
      dataSource
    }
  const themeUnsub = theme.subscribe(value => {
    chart?.setChartAttribute('theme', value === 'dark' ? 'candy' : 'fusion')
  })
  onDestroy(themeUnsub)
</script>

<div id='month-pie-chart-container'>
  <SvelteFC {...chartConfig} bind:chart />
</div>


<style>
    #month-pie-chart-container {
        height: 500px;
    }
</style>
