<script lang='ts'>
  import { Media } from '../../../../../lib/vendors/instagram/Media'
  import { longDateTime } from '../../../../../lib/common/DateUtils'

  export let data: Media
</script>

<div class='container'>
  <h3 class='title'>Instagram posts</h3>
  {#each data.photos as post}
    <div>
      <p>
        <b>{post.caption}</b>
        <br />Posted on {longDateTime(new Date(post.taken_at))}
        <br />Path: {post.path}
      </p>
    </div>
  {/each}
</div>

<style>
    .container {
        display: grid;
        gap: var(--lumo-space-s);
        margin: var(--lumo-space-l);
    }

    .title {
        margin: 0;
    }

    .container > div {
        background: var(--lumo-contrast-10pct);
        padding: var(--lumo-space-s);
    }
</style>