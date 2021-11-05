<script lang='ts'>
  export let data: string[] = []
  export let heading: string
  export let maxItems: number = 1000
</script>

<div class='container'>
  <p class='count'>{heading}</p>
  {#each data.slice(0, maxItems) as line}
    <p>{line}</p>
  {/each}
</div>


<style>
    .container {
        padding: 0 var(--lumo-space-l);
    }

    .count {
        font-weight: bold;
    }
</style>