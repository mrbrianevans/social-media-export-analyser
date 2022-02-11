<script lang='ts'>
  import FusionCharts from 'fusioncharts'
  import Charts from 'fusioncharts/fusioncharts.charts'
  import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy'
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts'
  import type { TimeSeriesMetadata } from '../../../../lib/common/TimeSeriesAnalysis'
  import {
    theme
  } from '../../stores/themeStore'
  import { onDestroy } from 'svelte'

  fcRoot(FusionCharts, Charts, FusionTheme, CandyTheme)
  let chart
  // data from TimeSeries
  export let data: TimeSeriesMetadata['weekday']
  export let label: string
  let dataSource = {
      'chart': {
        'caption': label,
        'subCaption': 'Aggregated by day of week',
        'showValues': '1',
        'showPercentInTooltip': '0',
        'enableMultiSlicing': '1',
        'theme': $theme === 'dark' ? 'candy' : 'fusion'
      },
      'data': Object.entries(data).map(([label, value]) => ({ label, value }))
    },
    chartConfig = {
      type: 'pie2d',
      width: '100%',
      height: '500', // in pixels
      renderAt: 'chart-container',
      dataSource
    }
  const themeUnsub = theme.subscribe(value => {
    chart?.setChartAttribute('theme', value === 'dark' ? 'candy' : 'fusion')
  })
  onDestroy(themeUnsub)
</script>

<div id='chart-container'>
  <SvelteFC {...chartConfig} bind:chart />
</div>
