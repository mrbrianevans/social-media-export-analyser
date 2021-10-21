<script lang="ts">
  // import { JSONEditor } from 'svelte-jsoneditor'
  export let data = {}
</script>

<div class="editor">
<!--  <JSONEditor bind:content={data} />-->
  <pre>
    {JSON.stringify(data, null, 2)}
  </pre>
</div>

<style>
    .editor {
        width: 700px;
        height: 400px;
        overflow: scroll;
    }
</style>