import DataTable from './DataTable.svelte'
import type { SvelteComponent } from 'svelte'
import JsonEditor from './JsonEditor.svelte'
import MessageHistory from '../visualisations/chats/MessageHistory.svelte'
import InstagramPostsList from '../visualisations/lists/InstagramPostsList.svelte'
import StringBox from './StringBox.svelte'
import type { ComponentName } from '../../../lib/typedefs/Components'

// by using mapped types, this ensures a component exists for every ComponentName
export const ComponentForShape: {
  [componentName in ComponentName]: typeof SvelteComponent
} = {
  DataTable,
  JsonEditor,
  MessageHistory,
  InstagramPostsList,
  StringBox
}
