<script lang='ts'>
  // the keys of data are used as tab labels, the value are passed through to child component
  import { SvelteComponent } from 'svelte'
  import { sentenceCase } from "sentence-case";
  export let data: Record<string, any> = {}
  export let childComponent: SvelteComponent

  let selectedTab
  $: selectedTab = Object.keys(data).length ? Object.keys(data)[0] : null
</script>

<div>
  <vaadin-tabs>
    {#each Object.keys(data) as label}
      <vaadin-tab on:click={()=>selectedTab=label}><span>{sentenceCase(label)}</span></vaadin-tab>
    {/each}
  </vaadin-tabs>
  <div class='component-container'>
    <svelte:component this={childComponent} data={data[selectedTab]} />
  </div>
</div>

<style>
    .component-container {
        padding: 0 var(--lumo-space-l);
    }
</style>