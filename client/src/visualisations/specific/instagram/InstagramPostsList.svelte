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
      background-color: var(--lumo-contrast-10pct);
      border-color: var(--lumo-primary-color-50pct);
      border-width: medium;
      border-style: solid;
      border-radius: var(--lumo-border-radius-l);
      padding: var(--lumo-space-m);
      margin: 0.5rem 1rem;
    }
</style>