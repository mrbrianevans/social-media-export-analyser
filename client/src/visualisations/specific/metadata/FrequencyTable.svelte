<script lang='ts'>
  import type { FrequencyTables } from '../../../../../lib/common/FrequencyAnalysis'
  import VaadinGrid from '../../grids/VaadinGrid.svelte'

  export let data: FrequencyTables[string]
  export let label: string = 'Token'
  let token
  $: token = label // something like word or emoji or url
</script>

<VaadinGrid data={Object.entries(data).map(([word, freq])=>({[token]:word, occurrences: freq}))} />
