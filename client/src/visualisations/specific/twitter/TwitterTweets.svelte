<script lang="ts">
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { longDate } from '../../../../../lib/common/DateUtils'
  import { Tweet } from '../../../../../lib/vendors/twitter/Tweets'
  import { chunkTweetText } from './chunkTweetText'

  export let data: Tweet[]
  let start
  let end
</script>

<div class='container'>
  <VirtualList items={data} let:item={tweet} bind:start bind:end height="1000px">
    <div class='tweet'>
      <span class='posted small'>📆 Posted on {longDate(new Date(Date.parse(tweet.created_at)))}</span>
      <span class='favourite small'> {tweet.favorite_count} {tweet.favorited ? '🌟' : '⭐'} favourites</span>
      <span class='retweet small'> {tweet.retweet_count} {tweet.retweeted ? '🔂' : '🔁'} retweets</span>
      <p class='text'>
        {#each chunkTweetText(tweet) as chunk}
          {#if chunk.type === 'text'}
            {chunk.text}
          {:else if chunk.type === 'user mention'}
            <a>{chunk.text}</a>
<!--            ({chunk.data.name})-->
          {:else}
            <a>{chunk.text}</a>
          {/if}
        {/each}
      </p>
      <span class='platform small'>Posted on <a>{tweet.source.match(/>(.*)</)[1]}</a></span>
    </div>
  </VirtualList>
</div>

<style>
  .container{
      /*margin: 0 1rem;*/
      height: 100%;
      max-height: 100vh;
  }

  .tweet{
      background-color: var(--lumo-contrast-10pct);
      border-color: var(--lumo-primary-color-50pct);
      border-width: medium;
      border-style: solid;
      border-radius: var(--lumo-border-radius-l);
      padding: var(--lumo-space-m);
      margin: 0.5rem 1rem;
      width: 600px;
      display: inline-grid;
      grid-template-areas:
  'posted posted'
  'text1 text1'
  'favourite retweet'
  'platform platform';
  }

  .posted{
      grid-area: posted;
  }
  .text{
      grid-area: text1;
      font-size: var(--lumo-font-size-l);
  }
  .favourite{
      grid-area: favourite;
  }
  .retweet{
      grid-area: retweet;
  }
  .platform{
      grid-area: platform;
  }

  .small{
      font-size: var(--lumo-font-size-s);
  }
</style>