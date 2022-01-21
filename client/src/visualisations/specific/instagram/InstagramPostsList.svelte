<script lang='ts'>
  import VirtualList from '@sveltejs/svelte-virtual-list'
  import { Media } from '../../../../../lib/vendors/instagram/Media'
  import { longDateTime } from '../../../../../lib/common/DateUtils'
  import { onlyFilename } from '../../../../../lib/common/PathProcessing'

  export let data: Media
  let start
  let end

  function getUrl(path: string) {
    return sessionStorage.getItem(onlyFilename(path)) ?? `https://picsum.photos/seed/${onlyFilename(path)}/600/600.webp`
  }
</script>

<div class='container'>
  <VirtualList items={data} let:item={post} bind:start bind:end height='1000px'>
    <div class='post'>
      <p>
        <span theme='badge contrast'>{post.type}</span>
        {#if post.type === 'profile'}
      <span theme={'badge '+(post.is_active_profile?'success':'error')}>
            {post.is_active_profile ? 'active' : 'replaced'}
          </span>
      {/if}
        {#if post.location}
          <span theme='badge'>{post.location}</span>
        {/if}
        {#if post.caption}
          <br /><span>{post.caption}</span>
        {/if}
        <br />📆 {longDateTime(new Date(post.timestamp))}
      </p>
        {#if post.type === 'photo'}
          <img src={getUrl(post.path)} alt='generic image' />
        {:else if post.type === 'video'}
          <video controls src={getUrl(post.path)}></video>
        {:else if post.type === 'story'}
          <img src={getUrl(post.path)} alt='generic image' />
        {:else if post.type === 'profile'}
          <img src={getUrl(post.path)} alt={'instagram post with caption '+post.caption} />
        {/if}
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

    div.post img, video {
        width: 100%;
        border-radius: var(--lumo-border-radius-m);
    }
</style>