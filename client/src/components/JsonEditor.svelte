<script lang='ts'>
  import '@vaadin/scroller'
  import VirtualList from '@sveltejs/svelte-virtual-list'

  export let data = {}
  let jsonString: string
  $: jsonString = JSON.stringify(data, null, 2)
  let lines: string[]
  $: lines = jsonString.split('\n')
  let scroller
  let pre
  let height, outerHeight, innerPadding, innerMargin
  $: if (scroller) outerHeight = getComputedStyle(scroller).getPropertyValue('max-height')
  $: if (pre) innerPadding = getComputedStyle(pre).getPropertyValue('padding')
  $: if (pre) innerMargin = getComputedStyle(pre).getPropertyValue('margin')
  $: height = `CALC(${outerHeight} - ${innerPadding} - ${innerMargin} - 2rem)`
  // $: console.log({height})
</script>

<div class='editor'>
  <vaadin-scroller scroll-direction='vertical' class='scroller' bind:this={scroller}>
  <pre class='json' bind:this={pre}>
    {#if lines.length > 1000}
      <VirtualList items={lines} let:item={line} height={height}>
        {line}
      </VirtualList>
    {:else}
      {jsonString}
    {/if}
  </pre>
  </vaadin-scroller>
</div>

<style>
    .json {
        padding: var(--lumo-space-l);
        margin: var(--lumo-space-l);
        white-space: pre-wrap;
        font-family: "JetBrains Mono", monospace;
    }

    .json::selection {
        background: var(--lumo-primary-color-50pct);
    }

    vaadin-scroller.scroller {
        max-height: VAR(--container-height);
    }
</style>
