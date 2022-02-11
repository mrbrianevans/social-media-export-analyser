<script lang='ts'>

  import '@vaadin/tabs'
  import { SvelteComponent } from 'svelte'
  import { sentenceCase } from 'sentence-case'

  export let tabs: { label: string, component: SvelteComponent, props: Record<string, any> }[]

  export let selectedTab
  $: selectedTab = tabs?.length ? 0 : null
</script>

<div>
  <vaadin-tabs>
    {#each tabs as tab, index}
      <vaadin-tab on:click={()=>selectedTab=index} selected={index === selectedTab}>
        <span>{sentenceCase(tab.label)}</span></vaadin-tab>
    {/each}
  </vaadin-tabs>
  <pre>{JSON.stringify({ selectedTab })}</pre>
  <div class='component-container'>
    {#each tabs as tab, index}
      {#if index === selectedTab}
        <svelte:component this={tab.component} {...tab.props} />
      {/if}
    {/each}
  </div>
</div>

<style>
    .component-container {
        padding: 0;
    }
</style>
