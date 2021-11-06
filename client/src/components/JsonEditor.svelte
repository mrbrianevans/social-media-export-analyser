<script lang='ts'>
  // import { JSONEditor } from 'svelte-jsoneditor'
  export let data = {}
</script>

<div class='editor'>
  <!--  <JSONEditor bind:content={data} />-->
  <pre class='json'>
    {JSON.stringify(data, null, 2)}
  </pre>
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
</style>