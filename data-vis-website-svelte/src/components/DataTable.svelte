<script lang="ts">
  export let data
  export let maxItems = 50
  const settings = {
    sortable: true,
    pagination: true,
    rowPerPage: 50,
    columnFilter: true,
  }
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
      background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  }
  table.datatable > thead {
      border-bottom: 1px solid black;
  }
  table.datatable > thead > tr > th{
      max-width: 10rem;
  }
  table.datatable > tbody > tr > td:first-child {
      border-right: 1px solid black;
      text-align: right;
      padding-right: 0.2rem;
  }
  table.datatable a {
      text-decoration: underline;
      display: inline-block;
  }
  table.datatable a:hover {
      font-weight: bold;
  }
  table.datatable td {
      padding: 0.4em 0.2em;
      max-width: 20rem;
  }
  table.datatable > tbody > tr:hover {
      background: #fff6;
  }
</style>