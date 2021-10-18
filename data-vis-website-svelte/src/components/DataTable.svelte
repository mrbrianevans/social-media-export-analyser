<script>
  import { data } from './data'
  import { Datatable, rows } from 'svelte-simple-datatables'

  const settings = {
    sortable: true,
    pagination: true,
    rowPerPage: 50,
    columnFilter: true,
  }
</script>

<Datatable settings={settings} data={data}>
  <thead>
  <th data-key="id">ID</th>
  <th data-key="first_name">First Name</th>
  <th data-key="last_name">Last Name</th>
  <th data-key="email">Email</th>
  <th data-key="ip_address">IP Adress</th>
  </thead>
  <tbody>
  {#each $rows as row}
    <tr>
      <td>{row.id}</td>
      <td>{row.first_name}</td>
      <td>{row.last_name}</td>
      <td>{row.email}</td>
      <td>{row.ip_address}</td>
    </tr>
  {/each}
  </tbody>
</Datatable>