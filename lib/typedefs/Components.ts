export type VaadinMessageHistoryFormat = {
  time: string
  text: string
  userName: string
}[]

const ComponentList = {
  MessageHistory: 'Display a list of text messages',
  DataTable: 'A regular table of data',
  JsonEditor: 'An interactive JSON object editor',
  InstagramPostsList: 'A feed of posts similar to Instagrams interface',
  StringBox: 'A simple element showing a string of text',
  VaadinGrid: 'A scalable data grid with sortable columns',
  InstagramConnections: 'A tab layout of lists of instagram connections'
}

export type ComponentName = keyof typeof ComponentList
