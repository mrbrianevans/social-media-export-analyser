<script lang="ts">
  export let data
  export let maxItems = 50
</script>

{#if data && data.length}
<div class='container'>
  <table class='datatable'>
    <thead>
    <tr>
      <th></th>
      {#each Object.keys(data[0]) as columnName}
        <th>{columnName}</th>
      {/each}
    </tr>
    </thead>
    <tbody>
    {#each data.slice(0,maxItems) as row, index}
      <tr>
        <td>{index + 1}</td>
        {#each Object.keys(data[0]) as columnName}
          <td>{row[columnName]}</td>
        {/each}
      </tr>
    {/each}
    </tbody>
  </table>
  <p>Showing {Math.min(maxItems,data.length)} out of {data.length} rows</p>
</div>
{/if}

<style>
    div.container{
        max-width: 100%;
        overflow-x: scroll;
    }
  table.datatable {
      border-collapse: collapse;
      border: 1px solid var(--lumo-contrast-20pct);
  }
  table.datatable > thead {
      border-bottom: 1px solid var(--lumo-contrast-20pct);
  }
  table.datatable > thead > tr > th{
      max-width: 10rem;
  }
  table.datatable > tbody > tr > td:first-child {
      border-right: 1px solid var(--lumo-contrast-20pct);
      text-align: right;
      padding-right: 0.2rem;
  }
  table.datatable td {
      padding: 0.4em 0.2em;
      max-width: 20rem;
  }
  table.datatable > tbody > tr:hover {
      background: var(--lumo-contrast-5pct);
  }
</style>