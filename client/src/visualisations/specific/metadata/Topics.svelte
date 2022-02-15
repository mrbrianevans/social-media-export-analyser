<script lang='ts'>
  import { GetTopicsReturnType, getTopics, isGetTopicsReady } from 'fast-topics'
  import JsonEditor from '../../../components/JsonEditor.svelte'
  import { GetTopicsOptions } from 'fast-topics/dist/GetTopicsOptions'

  export let documents: string[]
  export let options: GetTopicsOptions
  export let topics
</script>


<div>
  <!--{#await topicsPromise}-->
  <!--    <p>Loading topics</p>-->
  <!--    {:then topics}-->
  <h3>Topics</h3>
  {#each Object.entries(topics.topics) as [topic, words]}
    <h4>Topic #{topic}</h4>
    <p>{words.slice(0, 3).map(word => `${word.word}(${(word.rank * 100).toFixed(2)}%)`).join(', ')}</p>
  {/each}
  <h3>Documents</h3>
  {#each Object.entries(topics.docs) as [idx, doc]}
    <p>Doc#{idx} -
      <i>{documents[idx]}</i>: {doc.slice(0, 3).map(topic => `#${topic.topic}(${(topic.rank * 100).toFixed(2)}%)`).join(', ')}
    </p>
  {/each}
  <JsonEditor data={topics} />
  <!--{/await}-->
</div>
