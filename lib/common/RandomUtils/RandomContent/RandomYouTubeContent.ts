export const ContentCreators: readonly {
  name: string
  category: string
  url?: string
}[] = [
  { name: 'Cocomelon - Nursery Rhymes', category: 'Education' },
  { name: 'Vlad and Niki', category: 'Entertainment' },
  {
    name: '5-Minute Crafts',
    category: 'How-to',
    url: 'https://www.youtube.com/c/5MinuteCraftsYouTube'
  },
  { name: 'Justin Bieber', category: 'Music' },
  {
    name: 'Dude Perfect',
    category: 'Sports',
    url: 'https://www.youtube.com/c/DudePerfect'
  },
  { name: 'Movieclips', category: 'Film' },
  { name: "Pinkfong! Kids' Stories & Songs", category: 'Education' },
  { name: 'Marshmello', category: 'Music' },
  {
    name: "LooLoo Kids - Nursery Rhymes and Children's Songs",
    category: 'Music'
  },
  { name: 'Taylor Swift', category: 'Music' },
  { name: 'Billie Eilish', category: 'Music' },
  { name: 'BRIGHT SIDE', category: 'Entertainment' },
  { name: 'Katy Perry', category: 'Music' },
  { name: 'Alan Walker', category: 'Music' },
  { name: 'Ed Sheeran', category: 'Music' }
] as const

export const YouTubeVideos: readonly {
  channel: string
  title: string
  url?: string
}[] = [
  { channel: 'Ed Sheeran', title: 'Shape of You' },
  { channel: 'Katy Perry', title: 'Roar' },
  { channel: 'Justin Bieber', title: 'Sorry' },
  { channel: 'Ed Sheeran', title: 'Thinking Out Loud' },
  { channel: 'Alan Walker', title: 'Faded' },
  { channel: 'Katy Perry', title: 'Dark Horse' },
  { channel: 'Taylor Swift', title: 'Shake It Off' },
  { channel: 'Ed Sheeran', title: 'Perfect' },
  {
    channel: '5-Minute Crafts',
    title: '42 HOLY GRAIL HACKS THAT WILL SAVE YOU A FORTUNE',
    url: 'https://www.youtube.com/watch?v=_9YMpuLDnwo'
  },
  {
    channel: "Pinkfong! Kids' Stories & Songs",
    title:
      'Baby Shark Dance | #babyshark Most Viewed Video | Animal Songs | PINKFONG Songs for Children',
    url: 'https://www.youtube.com/watch?v=XqZsoesa55w'
  },
  {
    channel: 'Dude Perfect',
    title: 'Water Bottle Flip 2 | Dude Perfect',
    url: 'https://www.youtube.com/watch?v=VJwoSfTOhyM'
  }
] as const
