<script lang="ts">
  import { generateSampleMediaData } from '../../../../lib/vendors/instagram/Media'

  let posts = generateSampleMediaData({})
</script>

<div>
  <h3>Instagram posts</h3>
  <div class='container'>
  {#each posts.photos as post}
    <div>
    <p>
      <b>{post.caption}</b>
      <br/>Taken on {post.taken_at}
      <br/>Path: {post.path}
    </p>
    </div>
  {/each}
  </div>
</div>

<style>
  .container{
      display: grid;
      gap: 1rem;
  }
  .container>div{
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      padding: 1rem;
  }
</style>