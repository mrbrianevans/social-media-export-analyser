<script lang='ts'>
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { Media } from '../../../../../lib/vendors/instagram/Media'
  import { longDateTime } from '../../../../../lib/common/DateUtils'

  export let data: Media
  let start
  let end
</script>

<div class='container'>
  <VirtualList items={data.photos} let:item={post} bind:start bind:end height="1000px">
    <div class='post'>
      <p>
        <span>{post.caption}</span>
        <br />Posted on {longDateTime(new Date(post.taken_at))}
        <br />Path: {post.path}
      </p>
    </div>
  </VirtualList>
</div>

<style>
    .container {
        display: grid;
        gap: var(--lumo-space-s);
        margin: var(--lumo-space-l);
    }

    .container div.post {
      background-color: var(--lumo-contrast-10pct);
      border-color: var(--lumo-primary-color-50pct);
      border-width: medium;
      border-style: solid;
      border-radius: var(--lumo-border-radius-l);
      padding: var(--lumo-space-m);
      margin: 0.5rem 1rem;
      width: 600px;
    }
</style>