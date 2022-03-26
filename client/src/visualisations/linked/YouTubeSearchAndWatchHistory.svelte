<script lang='ts'>
  import { YoutubeWatchSearchHistory } from '../../../../lib/linking/processors/youtubeWatchSearchHistory'
  import { minuteDifference } from '../../../../lib/common/DateUtils'

  export let data: YoutubeWatchSearchHistory
</script>

<div>
  {#each data as { search, video }}
    <p>You searched <b>{search.searchTerm}</b> on {search.date} and then watched <b>{video.video}</b> by {video.channel}
      within five minutes. ({minuteDifference(video.date, search.date).toFixed(0)} minutes later)</p>
  {/each}
</div>
