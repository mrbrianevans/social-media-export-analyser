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
  StringBox: 'A simple element showing a string of text'
}

export type ComponentName = keyof typeof ComponentList
