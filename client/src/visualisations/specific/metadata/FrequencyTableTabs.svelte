<script lang="ts">
  import type {FrequencyTables} from '../../../../../lib/common/FrequencyAnalysis'
  import Tabs from '../../layouts/Tabs.svelte'
  import FrequencyTable from './FrequencyTable.svelte'

  export let data: FrequencyTables
</script>


<Tabs data={data} childComponent={FrequencyTable}/>