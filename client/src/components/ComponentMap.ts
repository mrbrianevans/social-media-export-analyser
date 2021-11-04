import DataTable from './DataTable.svelte'
import type { SvelteComponent } from 'svelte'
import JsonEditor from './JsonEditor.svelte'
import MessageHistory from '../visualisations/chats/MessageHistory.svelte'
import InstagramPostsList from '../visualisations/lists/InstagramPostsList.svelte'
import StringBox from './StringBox.svelte'
import VaadinGrid from '../visualisations/grids/VaadinGrid.svelte'
import type { ComponentName } from '../../../lib/typedefs/Components'
import InstagramConnections from '../visualisations/specific/InstagramConnections.svelte'

// by using mapped types, this ensures a component exists for every ComponentName
export const ComponentForShape: {
  [componentName in ComponentName]: typeof SvelteComponent
} = {
  DataTable,
  JsonEditor,
  MessageHistory,
  InstagramPostsList,
  StringBox,
  VaadinGrid,
  InstagramConnections
}
