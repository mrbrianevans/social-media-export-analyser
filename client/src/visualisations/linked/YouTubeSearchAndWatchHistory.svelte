<script>
  import { YoutubeWatchSearchHistory } from '../../../../lib/linking/processors/youtubeWatchSearchHistory'
  import JsonEditor from '../../components/JsonEditor.svelte'

  export let data: YoutubeWatchSearchHistory
</script>

<div>
  <JsonEditor data={data} />
</div>
