
<script lang='ts'>
  import { VideoData } from '../../../../lib/preProcessing/preProcessors/video'

  export let data: VideoData
</script>


<div>
  <video src={data.url} controls></video>
</div>