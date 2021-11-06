<script lang='ts'>
  export let data: { text: string }
</script>


<pre class='string'>
  {data.text?.toString() ?? data.toString()}
</pre>


<style>
    .string {
        padding: var(--lumo-space-l);
        margin: var(--lumo-space-l);
        white-space: pre-wrap;
        font-family: "JetBrains Mono", monospace;
    }

    .string::selection {
        background: var(--lumo-primary-color-50pct);
    }
</style>