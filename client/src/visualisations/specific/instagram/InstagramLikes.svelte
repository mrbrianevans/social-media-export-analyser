<script lang='ts'>
  import { InstagramLikesPostProcess } from '../../../../../lib/vendors/instagram/Likes'
  import OneLineList from '../../lists/OneLineList.svelte'
  import { longDateTime } from '../../../../../lib/common/DateUtils'

  export let data: InstagramLikesPostProcess
  export let maxItems: number = 1000
</script>


<OneLineList
  data={data.slice(0,maxItems).map(like=>`On ${longDateTime(new Date(like.date))} you liked a ${like.postType === 'media' ? 'post':'comment'} by @${like.username}`)}
  heading={`${data.length} likes (${data.filter(d=>d.postType==='media').length} posts, ${data.filter(d=>d.postType==='comment').length} comments)`}
  maxItems={maxItems} />


<style></style>
