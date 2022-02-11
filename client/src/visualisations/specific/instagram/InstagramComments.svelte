<script lang='ts'>
  import { InstagramCommentsProcessed } from '../../../../../lib/vendors/instagram/Comments'
  import { longDateTime } from '../../../../../lib/common/DateUtils'
  import OneLineList from '../../lists/OneLineList.svelte'

  export let data: InstagramCommentsProcessed
  export let maxItems: number = 1000
</script>

<OneLineList
  data={data.slice(0,maxItems).map(comment=>`On ${longDateTime(new Date(comment.date))} you commented "${comment.content}" on a post by @${comment.username}`)}
  heading={`${data.length} comments`} maxItems={maxItems} />

<style>
</style>
