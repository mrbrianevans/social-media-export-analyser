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
  InstagramConnections: 'A tab layout of lists of instagram connections',
  InstagramLikes: 'A list of posts and comments like by an instagram user',
  InstagramComments: 'A list of instagram comments',
  KeyValueCard: 'A card that can display arbitrary string key-value pairs',
  InstagramProfile: 'A specially designed profile for instagram users',
  TwitterTweets: 'Timeline of twitter tweets',
  Image: 'An image',
  Video: 'A video player'
}

export type ComponentName = keyof typeof ComponentList
