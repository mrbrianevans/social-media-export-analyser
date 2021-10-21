import DataTable from './DataTable.svelte'
import type { DataShape } from '../../../lib/typedefs/DataShapes'
import type { SvelteComponent } from 'svelte'
import JsonEditor from './JsonEditor.svelte'
import MessageHistory from '../visualisations/chats/MessageHistory.svelte'
import InstagramPostsList from '../visualisations/lists/InstagramPostsList.svelte'
import StringBox from './StringBox.svelte'

// mapped type forces component to exist for every DataShape
export const ComponentForShape: {
  [shape in DataShape]: typeof SvelteComponent
} = {
  csv: DataTable,
  json: JsonEditor,
  messages: MessageHistory,
  media: InstagramPostsList,
  string: StringBox
}
