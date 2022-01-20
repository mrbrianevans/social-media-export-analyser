
<script lang='ts'>
  import { ImageDataObject } from '../../../../lib/preProcessing/preProcessors/image'

  export let data: ImageDataObject
</script>


<div>
  <img src={data.url} alt='generic image'/>
</div>