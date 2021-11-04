<script>
  import Tabs from '../layouts/Tabs.svelte'
  import OneLineList from '../lists/OneLineList.svelte'

  export let data
</script>

<Tabs childComponent={OneLineList} data={data}/>