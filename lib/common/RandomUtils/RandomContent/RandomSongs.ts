import { RandElem } from '../RandomArrayUtils'

export function generateRandomSong() {
  return RandElem(Songs)
}

export const Songs: { artist: string; year: string; title: string }[] = [
  {
    title: 'Respect',
    artist: 'Aretha Franklin',
    year: '1967'
  },
  {
    title: 'In The Mood',
    artist: 'Glenn Miller',
    year: '1939'
  },
  {
    title: 'White Christmas',
    artist: 'Bing Crosby',
    year: '1942'
  },
  {
    title: 'Johnny B. Goode',
    artist: 'Chuck Berry',
    year: '1958'
  },
  {
    title: 'Over The Rainbow',
    artist: 'Judy Garland',
    year: '1939'
  },
  {
    title: 'Louie Louie',
    artist: 'Kingsmen',
    year: '1963'
  },
  {
    title: 'Yesterday',
    artist: 'Beatles',
    year: '1965'
  },
  {
    title: 'I Heard It Through The Grapevine',
    artist: 'Marvin Gaye',
    year: '1968'
  },
  {
    title: 'Rock Around The Clock',
    artist: 'Bill Haley & His Comets',
    year: '1954'
  },
  {
    title: 'Jailhouse Rock',
    artist: 'Elvis Presley',
    year: '1957'
  },
  {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    year: '1982'
  },
  {
    title: "(I Can't Get No) Satisfaction",
    artist: 'Rolling Stones',
    year: '1965'
  },
  {
    title: 'The Christmas Song',
    artist: 'Nat "King" Cole',
    year: '1946'
  },
  {
    title: 'I Will Survive',
    artist: 'Gloria Gaynor',
    year: '1978'
  },
  {
    title: 'My Way',
    artist: 'Frank Sinatra',
    year: '1969'
  },
  {
    title: 'God Bless The Child',
    artist: 'Billie Holiday',
    year: '1941'
  },
  {
    title: 'Hound Dog',
    artist: 'Elvis Presley',
    year: '1956'
  },
  {
    title: 'Like A Rolling Stone',
    artist: 'Bob Dylan',
    year: '1965'
  },
  {
    title: "Your Cheatin' Heart",
    artist: 'Hank Williams',
    year: '1953'
  },
  {
    title: 'God Bless America',
    artist: 'Kate Smith',
    year: '1939'
  },
  {
    title: 'Sing, Sing, Sing (With A Swing) [Live at Carnegie Hall]',
    artist: 'Benny Goodman',
    year: '1938'
  },
  {
    title: 'Good Vibrations',
    artist: 'Beach Boys',
    year: '1966'
  },
  {
    title: 'My Girl',
    artist: 'Temptations',
    year: '1964'
  },
  {
    title: 'Mack The Knife',
    artist: 'Bobby Darin',
    year: '1959'
  },
  {
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    year: '1971'
  },
  {
    title: 'Hey Jude',
    artist: 'Beatles',
    year: '1968'
  },
  {
    title: "You've Lost That Lovin' Feeling",
    artist: 'Righteous Brothers',
    year: '1964'
  },
  {
    title: 'Celebration',
    artist: 'Kool & The Gang',
    year: '1980'
  },
  {
    title: 'Tutti-Frutti',
    artist: 'Little Richard',
    year: '1955'
  },
  {
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    year: '1991'
  },
  {
    title: 'Take The "A" Train',
    artist: 'Duke Ellington',
    year: '1941'
  },
  {
    title: 'Star Dust',
    artist: 'Artie Shaw',
    year: '1940'
  },
  {
    title: 'The Stars And Stripes Forever',
    artist: "John Philip Sousa's Band",
    year: '1897'
  },
  {
    title: 'Stand By Me',
    artist: 'Ben E. King',
    year: '1961'
  },
  {
    title: 'Swanee',
    artist: 'Al Jolson',
    year: '1920'
  },
  {
    title: 'West End Blues',
    artist: 'Louis Armstrong',
    year: '1928'
  },
  {
    title: "Don't Be Cruel",
    artist: 'Elvis Presley',
    year: '1956'
  },
  {
    title: 'Minnie The Moocher',
    artist: 'Cab Calloway',
    year: '1931'
  },
  {
    title: "Papa's Got A Brand New Bag",
    artist: 'James Brown',
    year: '1965'
  },
  {
    title: 'Bo Diddley',
    artist: 'Bo Diddley',
    year: '1955'
  },
  {
    title: 'Jambalaya (On The Bayou)',
    artist: 'Hank Williams',
    year: '1952'
  },
  {
    title: 'Georgia On My Mind',
    artist: 'Ray Charles',
    year: '1960'
  },
  {
    title: 'Maybellene',
    artist: 'Chuck Berry',
    year: '1955'
  },
  {
    title: "Blowin' In The Wind",
    artist: 'Bob Dylan',
    year: '1963'
  },
  {
    title: 'I Pagliacci',
    artist: 'Vesti La Giubba - Enrico Caruso',
    year: '1904'
  },
  {
    title: 'Strange Fruit',
    artist: 'Billie Holiday',
    year: '1939'
  },
  {
    title: 'Heartbreak Hotel',
    artist: 'Elvis Presley',
    year: '1956'
  },
  {
    title: 'Earth Angel',
    artist: 'Penguins',
    year: '1954'
  },
  {
    title: 'Born to Run',
    artist: 'Bruce Springsteen',
    year: '1975'
  },
  {
    title: 'The Twist',
    artist: 'Chubby Checker',
    year: '1960'
  },
  {
    title: "Stayin' Alive",
    artist: 'Bee Gees',
    year: '1977'
  },
  {
    title: "What's Going On",
    artist: 'Marvin Gaye',
    year: '1971'
  },
  {
    title: 'I Want To Hold Your Hand',
    artist: 'Beatles',
    year: '1963'
  },
  {
    title: 'Rock-A-Bye Your Baby With A Dixie Melody',
    artist: 'Al Jolson',
    year: '1918'
  },
  {
    title: "What'd I Say",
    artist: 'Ray Charles',
    year: '1959'
  },
  {
    title: "I've Got You Under My Skin",
    artist: 'Frank Sinatra',
    year: '1956'
  },
  {
    title: "Whole Lot of Shakin' Going On",
    artist: 'Jerry Lee Lewis',
    year: '1957'
  },
  {
    title: 'A Day In The Life',
    artist: 'Beatles',
    year: '1967'
  },
  {
    title: 'Rhapsody In Blue',
    artist: 'Paul Whiteman feat. George Gershwin',
    year: '1924'
  },
  {
    title: 'Take Me Out To The Ball Game',
    artist: 'Haydn Quartet',
    year: '1908'
  },
  {
    title: "Ain't Misbehavin'",
    artist: 'Fats Waller',
    year: '1929'
  },
  {
    title: 'Crazy',
    artist: 'Patsy Cline',
    year: '1961'
  },
  {
    title: 'Superstition',
    artist: 'Stevie Wonder',
    year: '1972'
  },
  {
    title: 'Unforgettable',
    artist: 'Nat "King" Cole',
    year: '1951'
  },
  {
    title: 'Proud Mary',
    artist: 'Creedence Clearwater Revival',
    year: '1969'
  },
  {
    title: "Rapper's Delight",
    artist: 'Sugarhill Gang',
    year: '1979'
  },
  {
    title: 'I Left My Heart In San Francisco',
    artist: 'Tony Bennett',
    year: '1962'
  },
  {
    title: 'A Change Is Gonna Come',
    artist: 'Sam Cooke',
    year: '1964'
  },
  {
    title: 'No Woman, No Cry',
    artist: 'Bob Marley and the Wailers',
    year: '1974'
  },
  {
    title: 'Crossroads Blues',
    artist: 'Robert Johnson',
    year: '1937'
  },
  {
    title: 'This Land Is Your Land',
    artist: 'Woody Guthrie',
    year: '1951'
  },
  {
    title: "I'm So Lonesome I Could Cry",
    artist: 'Hank Williams',
    year: '1949'
  },
  {
    title: 'Moonlight Serenade',
    artist: 'Glenn Miller',
    year: '1939'
  },
  {
    title: 'Shout',
    artist: 'Isley Brothers',
    year: '1959'
  },
  {
    title: 'I Want You Back',
    artist: 'Jackson 5',
    year: '1969'
  },
  {
    title: 'I Walk The Line',
    artist: 'Johnny Cash',
    year: '1956'
  },
  {
    title: "Good Rockin' Tonight",
    artist: 'Wynonie Harris',
    year: '1948'
  },
  {
    title: 'You Really Got Me',
    artist: 'Kinks',
    year: '1964'
  },
  {
    title: 'Why Do Fools Fall In Love',
    artist: 'Frankie Lymon & the Teenagers',
    year: '1955'
  },
  {
    title: 'She Loves You',
    artist: 'Beatles',
    year: '1963'
  },
  {
    title: 'Swinging On A Star',
    artist: 'Bing Crosby',
    year: '1944'
  },
  {
    title: 'Imagine',
    artist: 'John Lennon',
    year: '1971'
  },
  {
    title: 'Day-O (Banana Boat Song)',
    artist: 'Harry Belafonte',
    year: '1956'
  },
  {
    title: 'Shake, Rattle And Roll',
    artist: 'Joe Turner',
    year: '1954'
  },
  {
    title: 'Where Did Our Love Go',
    artist: 'Supremes',
    year: '1964'
  },
  {
    title: "(Sittin' On) The Dock Of The Bay",
    artist: 'Otis Redding',
    year: '1968'
  },
  {
    title: 'Blue Suede Shoes',
    artist: 'Carl Perkins',
    year: '1956'
  },
  {
    title: 'Please, Please, Please',
    artist: 'James Brown and the Famous Flames',
    year: '1956'
  },
  {
    title: "If I Didn't Care",
    artist: 'Ink Spots',
    year: '1939'
  },
  {
    title: 'Sixty Minute Man',
    artist: 'Billy Ward and the Dominoes',
    year: '1951'
  },
  {
    title: 'Twist And Shout',
    artist: 'Beatles',
    year: '1963'
  },
  {
    title: 'You Always Hurt The One You Love',
    artist: 'Mills Brothers',
    year: '1944'
  },
  {
    title: 'Mood Indigo',
    artist: 'Duke Ellington',
    year: '1930'
  },
  {
    title: 'Will You Love Me Tomorrow',
    artist: 'Shirelles',
    year: '1960'
  },
  {
    title: 'Be My Baby',
    artist: 'Ronettes',
    year: '1963'
  },
  {
    title: 'When A Man Loves A Woman',
    artist: 'Percy Sledge',
    year: '1966'
  },
  {
    title: 'Blueberry Hill',
    artist: 'Fats Domino',
    year: '1956'
  },
  {
    title: "One O'Clock Jump",
    artist: 'Count Basie',
    year: '1937'
  },
  {
    title: 'T For Texas (Blue Yodel # 1)',
    artist: 'Jimmie Rodgers',
    year: '1928'
  },
  {
    title: 'Green Onions',
    artist: "Booker T. & the MG's",
    year: '1962'
  },
  {
    title: 'Rudolph, The Red-Nosed Reindeer',
    artist: 'Gene Autry',
    year: '1949'
  },
  {
    title: 'The Great Pretender',
    artist: 'Platters',
    year: '1955'
  },
  {
    title: 'White Christmas',
    artist: 'Drifters featuring Clyde McPhatter',
    year: '1954'
  },
  {
    title: 'You Send Me',
    artist: 'Sam Cooke',
    year: '1957'
  },
  {
    title: 'Boogie Woogie Bugle Boy',
    artist: 'Andrews Sisters',
    year: '1941'
  },
  {
    title: "That'll Be The Day",
    artist: 'Buddy Holly and the Crickets',
    year: '1957'
  },
  {
    title: "A Hard Day's Night",
    artist: 'Beatles',
    year: '1964'
  },
  {
    title: 'Caldonia Boogie',
    artist: 'Louis Jordan',
    year: '1945'
  },
  {
    title: 'Wabash Cannon Ball',
    artist: 'Roy Acuff',
    year: '1938'
  },
  {
    title: 'All Shook Up',
    artist: 'Elvis Presley',
    year: '1957'
  },
  {
    title: 'Under The Boardwalk',
    artist: 'Drifters',
    year: '1964'
  },
  {
    title: 'Sunshine Of Your Love',
    artist: 'Cream',
    year: '1967'
  },
  {
    title: 'The Loco-Motion',
    artist: 'Little Eva',
    year: '1962'
  },
  {
    title: 'So What',
    artist: 'Miles Davis',
    year: '1959'
  },
  {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: '1975'
  },
  {
    title: 'In The Midnight Hour',
    artist: 'Wilson Pickett',
    year: '1965'
  },
  {
    title: 'Only The Lonely',
    artist: 'Roy Orbison',
    year: '1960'
  },
  {
    title: 'People Get Ready',
    artist: 'Impressions',
    year: '1965'
  },
  {
    title: 'The Tennessee Waltz',
    artist: 'Patti Page',
    year: '1950'
  },
  {
    title: 'Suspicious Minds',
    artist: 'Elvis Presley',
    year: '1969'
  },
  {
    title: "You Keep Me Hangin' On",
    artist: 'Supremes',
    year: '1966'
  },
  {
    title: 'The Tracks Of My Tears',
    artist: 'Miracles',
    year: '1965'
  },
  {
    title: 'Rock And Roll, Part 2',
    artist: 'Gary Glitter',
    year: '1972'
  },
  {
    title: 'Long Tall Sally',
    artist: 'Little Richard',
    year: '1956'
  },
  {
    title: 'Cry',
    artist: 'Johnnie Ray',
    year: '1951'
  },
  {
    title: 'Rocket 88',
    artist: "Jackie Brenston with Ike Turner's Band",
    year: '1951'
  },
  {
    title: 'Something',
    artist: 'Beatles',
    year: '1969'
  },
  {
    title: 'American Pie',
    artist: 'Don McLean',
    year: '1971'
  },
  {
    title: 'Roll Over Beethoven',
    artist: 'Chuck Berry',
    year: '1956'
  },
  {
    title: 'In The Still Of The Nite',
    artist: 'Five Satins',
    year: '1956'
  },
  {
    title: 'Super Freak',
    artist: 'Rick James',
    year: '1981'
  },
  {
    title: 'Theme From Shaft',
    artist: 'Isaac Hayes',
    year: '1971'
  },
  {
    title: 'A Whiter Shade Of Pale',
    artist: 'Procol Harum',
    year: '1967'
  },
  {
    title: "That's Life",
    artist: 'Frank Sinatra',
    year: '1966'
  },
  {
    title: "I Can't Stop Loving You",
    artist: 'Ray Charles',
    year: '1962'
  },
  {
    title: 'Light My Fire',
    artist: 'Doors',
    year: '1967'
  },
  {
    title: 'Soul Man',
    artist: 'Sam & Dave',
    year: '1967'
  },
  {
    title: 'Purple Haze',
    artist: 'Jimi Hendrix',
    year: '1967'
  },
  {
    title: 'We Will Rock You/We Are the Champions',
    artist: 'Queen',
    year: '1977'
  },
  {
    title: 'Strawberry Fields Forever',
    artist: 'Beatles',
    year: '1967'
  },
  {
    title: "Let's Get It On",
    artist: 'Marvin Gaye',
    year: '1973'
  },
  {
    title: 'Hotel California',
    artist: 'Eagles',
    year: '1976'
  },
  {
    title: 'In The Jailhouse Now',
    artist: 'Jimmie Rodgers',
    year: '1928'
  },
  {
    title: '(Love Is Like A) Heat Wave',
    artist: 'Martha and the Vandellas',
    year: '1963'
  },
  {
    title: 'Y.M.C.A.',
    artist: 'Village People',
    year: '1978'
  },
  {
    title: 'House Of The Rising Sun',
    artist: 'Animals',
    year: '1964'
  },
  {
    title: 'I Just Want To Make Love To You',
    artist: 'Muddy Waters',
    year: '1954'
  },
  {
    title: 'Take Five',
    artist: 'Dave Brubeck',
    year: '1959'
  },
  {
    title: "The Times They Are A-Changin'",
    artist: 'Bob Dylan',
    year: '1964'
  },
  {
    title: "That's All Right",
    artist: 'Elvis Presley with Scotty and Bill',
    year: '1954'
  },
  {
    title: 'Oh. Pretty Woman',
    artist: 'Roy Orbison',
    year: '1964'
  },
  {
    title: 'Bridge Over Troubled Water',
    artist: 'Simon and Garfunkel',
    year: '1970'
  },
  {
    title: 'Lover Man (Oh Where Can You Be)',
    artist: 'Billie Holiday',
    year: '1945'
  },
  {
    title: 'Get Up (I Feel Like Being A) Sex Machine',
    artist: 'James Brown',
    year: '1970'
  },
  {
    title: 'Peggy Sue',
    artist: 'Buddy Holly',
    year: '1957'
  },
  {
    title: 'Summertime Blues',
    artist: 'Eddie Cochran',
    year: '1958'
  },
  {
    title: 'Goodnite Sweetheart Goodnite',
    artist: 'Spaniels',
    year: '1954'
  },
  {
    title: 'Pledging My Love',
    artist: 'Johnny Ace',
    year: '1954'
  },
  {
    title: 'Space Oddity',
    artist: 'David Bowie',
    year: '1969'
  },
  {
    title: 'Mr. Tambourine Man',
    artist: 'Byrds',
    year: '1965'
  },
  {
    title: 'Dancing In The Street',
    artist: 'Martha and the Vandellas',
    year: '1964'
  },
  {
    title: "You've Really Got A Hold On Me",
    artist: 'Miracles',
    year: '1962'
  },
  {
    title: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynyrd',
    year: '1974'
  },
  {
    title: 'Can The Circle Be Unbroken (Bye And Bye)',
    artist: 'Carter Family',
    year: '1935'
  },
  {
    title: 'Let It Be',
    artist: 'The Beatles',
    year: '1970'
  },
  {
    title: 'Sixteen Tons',
    artist: 'Tennessee Ernie Ford',
    year: '1955'
  },
  {
    title: 'My Generation',
    artist: 'The Who',
    year: '1965'
  },
  {
    title: 'He Stopped Loving Her Today',
    artist: 'George Jones',
    year: '1980'
  },
  {
    title: 'The St. Louis Blues',
    artist: 'Bessie Smith',
    year: '1925'
  },
  {
    title: 'Fight The Power',
    artist: 'Public Enemy',
    year: '1989'
  },
  {
    title: 'Unchained Melody',
    artist: 'Righteous Brothers',
    year: '1965'
  },
  {
    title: 'Stand By Your Man',
    artist: 'Tammy Wynette',
    year: '1968'
  },
  {
    title: 'The Wanderer',
    artist: 'Dion',
    year: '1961'
  },
  {
    title: 'Runaround Sue',
    artist: 'Dion',
    year: '1961'
  },
  {
    title: 'Up On The Roof',
    artist: 'Drifters',
    year: '1962'
  },
  {
    title: "For What It's Worth",
    artist: 'Buffalo Springfield',
    year: '1966'
  },
  {
    title: "I'll Take You There",
    artist: 'The Staple Singers',
    year: '1972'
  },
  {
    title: 'Never My Love',
    artist: 'Association',
    year: '1967'
  },
  {
    title: 'The Message',
    artist: 'Grandmaster Flash & The Furious Five',
    year: '1982'
  },
  {
    title: 'Everyday People',
    artist: 'Sly and the Family Stone',
    year: '1968'
  },
  {
    title: "Ol' Man River",
    artist: 'Paul Robeson',
    year: '1928'
  },
  {
    title: 'For Your Precious Love',
    artist: 'Jerry Butler & the Impressions',
    year: '1958'
  },
  {
    title: 'Walk On By',
    artist: 'Dionne Warwick',
    year: '1964'
  },
  {
    title: 'The Girl From Ipanema',
    artist: 'Stan Getz/Atrud Gilberto',
    year: '1964'
  },
  {
    title: '(You Gotta) Fight For Your Right (To Party)',
    artist: 'Beastie Boys',
    year: '1986'
  },
  {
    title: 'Great Balls Of Fire',
    artist: 'Jerry Lee Lewis',
    year: '1957'
  },
  {
    title: 'Smoke on the Water',
    artist: 'Deep Purple',
    year: '1972'
  },
  {
    title: "Won't Get Fooled Again",
    artist: 'The Who',
    year: '1971'
  },
  {
    title: 'Be-Bop-A-Lula',
    artist: 'Gene Vincent and the Blue Caps',
    year: '1956'
  },
  {
    title: 'The Sounds Of Silence',
    artist: 'Simon & Garfunkel',
    year: '1965'
  },
  {
    title: 'Paper Doll',
    artist: 'Mills Brothers',
    year: '1942'
  },
  {
    title: 'Hoochie Coochie Man',
    artist: 'Muddy Waters',
    year: '1954'
  },
  {
    title: 'The Harder They Come',
    artist: 'Jimmy Cliff',
    year: '1972'
  },
  {
    title: 'All I Want For Christmas Is You',
    artist: 'Mariah Carey',
    year: '1994'
  },
  {
    title: 'Whole Lotta Love',
    artist: 'Led Zeppelin',
    year: '1969'
  },
  {
    title: 'Sympathy For The Devil',
    artist: 'Rolling Stones',
    year: '1968'
  },
  {
    title: 'Koko',
    artist: 'Charlie Parker',
    year: '1945'
  },
  {
    title: 'Sentimental Journey',
    artist: 'Les Brown (Doris Day)',
    year: '1945'
  },
  {
    title: 'April In Paris',
    artist: 'Count Basie',
    year: '1955'
  },
  {
    title: 'Folsom Prison Blues',
    artist: 'Johnny Cash',
    year: '1955'
  },
  {
    title: 'Suite: Judy Blue Eyes',
    artist: 'Crosby, Stills & Nash',
    year: '1969'
  },
  {
    title: 'When Doves Cry',
    artist: 'Prince',
    year: '1984'
  },
  {
    title: 'Work With Me Annie',
    artist: 'Hank Ballard and the Midnighters',
    year: '1954'
  },
  {
    title: 'Rock Your Baby',
    artist: 'George McCrae',
    year: '1974'
  },
  {
    title: "Don't Worry Baby",
    artist: 'Beach Boys',
    year: '1964'
  },
  {
    title: "Ain't Too Proud To Beg",
    artist: 'Temptations',
    year: '1966'
  },
  {
    title: 'Family Affair',
    artist: 'Sly and the Family Stone',
    year: '1971'
  },
  {
    title: "Hey Good Lookin'",
    artist: 'Hank Williams',
    year: '1951'
  },
  {
    title: 'Flying Home',
    artist: 'Lionel Hampton',
    year: '1942'
  },
  {
    title: 'Shotgun',
    artist: 'Jr. Walker & the All-Stars',
    year: '1965'
  },
  {
    title: 'Honky Tonk',
    artist: 'Bill Doggett',
    year: '1956'
  },
  {
    title: "Walk, Don't Run",
    artist: 'Ventures',
    year: '1960'
  },
  {
    title: 'Rolling In The Deep',
    artist: 'Adele',
    year: '2010'
  },
  {
    title: 'Stay',
    artist: 'Maurice Williams & the Zodiacs',
    year: '1960'
  },
  {
    title: 'Get Ur Freak On',
    artist: 'Missy Misdemeanor Elliot',
    year: '2001'
  },
  {
    title: 'Walking The Floor Over You',
    artist: 'Ernest Tubb',
    year: '1941'
  },
  {
    title: 'Bring It On Home To Me',
    artist: 'Sam Cooke',
    year: '1962'
  },
  {
    title: 'Mona Lisa',
    artist: 'Nat "King" Cole',
    year: '1950'
  },
  {
    title: 'Bye Bye Love',
    artist: 'Everly Brothers',
    year: '1957'
  },
  {
    title: 'Lawdy Miss Clawdy',
    artist: 'Lloyd Price',
    year: '1952'
  },
  {
    title: "Makin' Whoopee",
    artist: 'Eddie Cantor',
    year: '1928'
  },
  {
    title: 'Nights In White Satin',
    artist: 'Moody Blues',
    year: '1967'
  },
  {
    title: 'Crying In The Chapel',
    artist: 'Orioles',
    year: '1953'
  },
  {
    title: 'Money Honey',
    artist: 'Drifters featuring Clyde McPhatter',
    year: '1953'
  },
  {
    title: 'Superfly',
    artist: 'Curtis Mayfield',
    year: '1972'
  },
  {
    title: 'Stormy Weather',
    artist: 'Lena Horne',
    year: '1942'
  },
  {
    title: 'Body And Soul',
    artist: 'Coleman Hawkins',
    year: '1939'
  },
  {
    title: 'Casey Jones',
    artist: 'American Quartet featuring Billy Murray',
    year: '1910'
  },
  {
    title: 'The Thrill Is Gone',
    artist: 'B.B. King',
    year: '1969'
  },
  {
    title: 'I Only Have Eyes For You',
    artist: 'Flamingos',
    year: '1959'
  },
  {
    title: 'California Girls',
    artist: 'Beach Boys',
    year: '1965'
  },
  {
    title: 'I Got You (I Feel Good)',
    artist: 'James Brown',
    year: '1965'
  },
  {
    title: "It's Now Or Never",
    artist: 'Elvis Presley',
    year: '1960'
  },
  {
    title: "I'm In The Mood For Love",
    artist: 'Louis Armstrong',
    year: '1935'
  },
  {
    title: 'Sh-Boom',
    artist: 'Chords',
    year: '1954'
  },
  {
    title: 'Watermelon Man',
    artist: 'Mongo Santamaria',
    year: '1963'
  },
  {
    title: 'Chattanooga Choo Choo',
    artist: 'Glenn Miller (Tex Beneke and the Modernaires)',
    year: '1941'
  },
  {
    title: 'You Shook Me All Night Long',
    artist: 'AC/DC',
    year: '1980'
  },
  {
    title: 'Layla',
    artist: 'Derek and the Dominos',
    year: '1970'
  },
  {
    title: 'Get Your Kicks On Route 66',
    artist: 'Nat "King" Cole',
    year: '1946'
  },
  {
    title: "Choo Choo Ch'Boogie",
    artist: 'Louis Jordan',
    year: '1946'
  },
  {
    title: 'Walk This Way',
    artist: 'Aerosmith',
    year: '1975'
  },
  {
    title: 'Cold Cold Heart',
    artist: 'Hank Williams',
    year: '1951'
  },
  {
    title: "Let's Stay Together",
    artist: 'Al Green',
    year: '1971'
  },
  {
    title: 'Chances Are',
    artist: 'Johnny Mathis',
    year: '1957'
  },
  {
    title: "Reach Out, I'll Be There",
    artist: 'Four Tops',
    year: '1966'
  },
  {
    title: 'Have Mercy Baby',
    artist: 'Billy Ward and the Dominoes',
    year: '1952'
  },
  {
    title: 'Jingle Bell Rock',
    artist: 'Bobby Helms',
    year: '1957'
  },
  {
    title: 'I Will Always Love You',
    artist: 'Whitney Houston',
    year: '1992'
  },
  {
    title: "Gimme Some Lovin'",
    artist: 'Spencer Davis Group',
    year: '1966'
  },
  {
    title: 'Me And Bobby McGee',
    artist: 'Janis Joplin',
    year: '1971'
  },
  {
    title: 'Mardi Gras In New Orleans',
    artist: 'Professor Longhair',
    year: '1950'
  },
  {
    title: 'Begin The Beguine',
    artist: 'Artie Shaw',
    year: '1938'
  },
  {
    title: 'Whatever Will Be, Will Be',
    artist: 'Doris Day',
    year: '1956'
  },
  {
    title: 'La Bamba',
    artist: 'Ritchie Valens',
    year: '1958'
  },
  {
    title: 'Killing Me Softly With His Song',
    artist: 'Roberta Flack',
    year: '1973'
  },
  {
    title: 'Nel Blu Dipinto Di Blu (Volare)',
    artist: 'Domenico Modugno',
    year: '1958'
  },
  {
    title: "I'll Be Seeing You",
    artist: 'Bing Crosby',
    year: '1944'
  },
  {
    title: 'One For My Baby',
    artist: 'Frank Sinatra',
    year: '1958'
  },
  {
    title: "I've Got A Woman",
    artist: 'Ray Charles',
    year: '1954'
  },
  {
    title: 'Crazy Blues',
    artist: 'Mamie Smith',
    year: '1920'
  },
  {
    title: "That's Amore",
    artist: 'Dean Martin',
    year: '1953'
  },
  {
    title: "Jumpin' Jack Flash",
    artist: 'Rolling Stones',
    year: '1968'
  },
  {
    title: 'Good Golly Miss Molly',
    artist: 'Little Richard',
    year: '1958'
  },
  {
    title: "Je T'aime ...Moi Non Plus",
    artist: 'Jane Birkin & Serge Gainsbourg',
    year: '1969'
  },
  {
    title: 'At Last',
    artist: 'Etta James',
    year: '1960'
  },
  {
    title: 'I Got You Babe',
    artist: 'Sonny & Cher',
    year: '1965'
  },
  {
    title: "Boogie Chillen'",
    artist: 'John Lee Hooker',
    year: '1948'
  },
  {
    title: 'Crimson And Clover',
    artist: 'Tommy James & Shondells',
    year: '1968'
  },
  {
    title: "Ain't It A Shame",
    artist: 'Fats Domino',
    year: '1955'
  },
  {
    title: 'New San Antonio Rose',
    artist: 'Bob Wills and His Texas Playboys',
    year: '1940'
  },
  {
    title: 'Dust My Broom',
    artist: 'Elmore James',
    year: '1951'
  },
  {
    title: 'Manish Boy',
    artist: 'Muddy Waters',
    year: '1955'
  },
  {
    title: 'Mystery Train',
    artist: 'Elvis Presley with Scotty and Bill',
    year: '1955'
  },
  {
    title: "Smokestack Lightnin'",
    artist: "Howlin' Wolf",
    year: '1956'
  },
  {
    title: 'Hey Ya!',
    artist: 'OutKast',
    year: '2003'
  },
  {
    title: 'Blue Moon Of Kentucky',
    artist: 'Bill Monroe',
    year: '1947'
  },
  {
    title: 'Beat It',
    artist: 'Michael Jackson',
    year: '1982'
  },
  {
    title: 'My Blue Heaven',
    artist: 'Gene Austin',
    year: '1927'
  },
  {
    title: 'God Only Knows',
    artist: 'Beach Boys',
    year: '1966'
  },
  {
    title: 'Fever',
    artist: 'Little Willie John',
    year: '1956'
  },
  {
    title: "Why Don't You Do Right?",
    artist: 'Benny Goodman (Peggy Lee)',
    year: '1942'
  },
  {
    title: 'Sonny Boy',
    artist: 'Al Jolson',
    year: '1928'
  },
  {
    title: 'Summer Wind',
    artist: 'Frank Sinatra',
    year: '1966'
  },
  {
    title: 'Planet Rock',
    artist: 'Afrika Bambaataa & the Soulsonic Force',
    year: '1982'
  },
  {
    title: 'You Belong To Me',
    artist: 'Jo Stafford',
    year: '1952'
  },
  {
    title: 'Call It Stormy Monday (But Tuesday Is Just As Bad)',
    artist: 'T-Bone Walker',
    year: '1947'
  },
  {
    title: "It's Too Late",
    artist: 'Carole King',
    year: '1971'
  },
  {
    title: "Rockin' Around The Christmas Tree",
    artist: 'Brenda Lee',
    year: '1958'
  },
  {
    title: "It's Like That",
    artist: 'Run-D.M.C.',
    year: '1983'
  },
  {
    title: 'A Love Supreme, Part 1: Acknowledgement',
    artist: 'John Coltrane',
    year: '1965'
  },
  {
    title: "I'll Never Smile Again",
    artist: 'Tommy Dorsey (Frank Sinatra and the Pied Pipers)',
    year: '1940'
  },
  {
    title: 'Paranoid',
    artist: 'Black Sabbath',
    year: '1970'
  },
  {
    title: 'Baby What You Want Me To Do',
    artist: 'Jimmy Reed',
    year: '1959'
  },
  {
    title: 'Honky Tonk Women',
    artist: 'Rolling Stones',
    year: '1969'
  },
  {
    title: 'Michelle',
    artist: 'Beatles',
    year: '1965'
  },
  {
    title: 'A Natural Woman (You Make Me Feel Like)',
    artist: 'Aretha Franklin',
    year: '1967'
  },
  {
    title: 'Please Come Home For Christmas',
    artist: 'Charles Brown',
    year: '1960'
  },
  {
    title: "I'm A Believer",
    artist: 'Monkees',
    year: '1966'
  },
  {
    title: 'I Get Around',
    artist: 'Beach Boys',
    year: '1964'
  },
  {
    title: 'Just My Imagination',
    artist: 'Temptations',
    year: '1971'
  },
  {
    title: 'End Of The Road',
    artist: 'Boyz II Men',
    year: '1992'
  },
  {
    title: "I Can't Get Started",
    artist: 'Bunny Berigan',
    year: '1937'
  },
  {
    title: 'A Tisket, A Tasket',
    artist: "Ella Fitzgerald with Chick Webb's Orchestra",
    year: '1938'
  },
  {
    title: 'Riders In The Sky (A Cowboy Legend)',
    artist: 'Vaughn Monroe',
    year: '1949'
  },
  {
    title: 'The Breaks',
    artist: 'Kurtis Blow',
    year: '1980'
  },
  {
    title: "Truckin'",
    artist: 'Grateful Dead',
    year: '1970'
  },
  {
    title: "Wouldn't It Be Nice",
    artist: 'Beach Boys',
    year: '1966'
  },
  {
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    year: '1977'
  },
  {
    title: 'Also Sprach Zarathustra (2001)',
    artist: 'Deodato',
    year: '1972'
  },
  {
    title: 'Moody Mood For Love',
    artist: 'King Pleasure',
    year: '1952'
  },
  {
    title: 'Real Love',
    artist: 'Mary J. Blige',
    year: '1992'
  },
  {
    title: 'Peace Be Still',
    artist: 'Rev. James Cleveland',
    year: '1962'
  },
  {
    title: 'Somebody To Love',
    artist: 'Jefferson Airplane',
    year: '1967'
  },
  {
    title: 'All Or Nothing At All',
    artist: 'Frank Sinatra with Harry James',
    year: '1939'
  },
  {
    title: 'Another Brick in the Wall, Part 2',
    artist: 'Pink Floyd',
    year: '1979'
  },
  {
    title: 'Every Breath You Take',
    artist: 'Police',
    year: '1983'
  },
  {
    title: "Don't Be That Way",
    artist: 'Benny Goodman',
    year: '1938'
  },
  {
    title: 'What I Like About You',
    artist: 'Romantics',
    year: '1979'
  },
  {
    title: 'Gonna Fly Now (Theme From "Rocky")',
    artist: 'Bill Conti',
    year: '1976'
  },
  {
    title: 'People',
    artist: 'Barbra Streisand',
    year: '1964'
  },
  {
    title: 'Straighten Up And Fly Right',
    artist: 'Nat "King" Cole',
    year: '1944'
  },
  {
    title: "California Dreamin'",
    artist: 'Mamas & Papas',
    year: '1965'
  },
  {
    title: 'Think',
    artist: 'Aretha Franklin',
    year: '1968'
  },
  {
    title: "Alexander's Ragtime Band",
    artist: 'Arthur Collins and Byron Harland',
    year: '1911'
  },
  {
    title: "I've Been Loving You Too Long",
    artist: 'Otis Redding',
    year: '1965'
  },
  {
    title: 'London Calling',
    artist: 'The Clash',
    year: '1979'
  },
  {
    title: 'El Paso',
    artist: 'Marty Robbins',
    year: '1959'
  },
  {
    title: 'The Huckle-Buck',
    artist: 'Paul Williams',
    year: '1949'
  },
  {
    title: "I Can't Help Myself",
    artist: 'Four Tops',
    year: '1965'
  },
  {
    title: 'Some Of These Days',
    artist: 'Sophie Tucker',
    year: '1911'
  },
  {
    title: "Can't Help Falling In Love",
    artist: 'Elvis Presley',
    year: '1961'
  },
  {
    title: 'Pennies From Heaven',
    artist: 'Bing Crosby',
    year: '1936'
  },
  {
    title: 'For Your Love',
    artist: 'Yardbirds',
    year: '1965'
  },
  {
    title: 'Move On Up A Little Higher',
    artist: 'Mahalia Jackson',
    year: '1947'
  },
  {
    title: 'Come Go With Me',
    artist: 'Del-Vikings',
    year: '1956'
  },
  {
    title: "I'm Sorry",
    artist: 'Brenda Lee',
    year: '1960'
  },
  {
    title: 'Subterranean Homesick Blues',
    artist: 'Bob Dylan',
    year: '1965'
  },
  {
    title: "Three O'Clock Blues",
    artist: 'B.B. King',
    year: '1951'
  },
  {
    title: "Papa Was a Rollin' Stone",
    artist: 'Temptations',
    year: '1972'
  },
  {
    title: 'Paradise by the Dashboard Light',
    artist: 'Meat Loaf',
    year: '1977'
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    year: '1987'
  },
  {
    title: 'Lean on Me',
    artist: 'Bill Withers',
    year: '1972'
  },
  {
    title: 'Blues In The Night',
    artist: 'Jimmie Lunceford (Willie Smith)',
    year: '1942'
  },
  {
    title: 'Sukiyaki',
    artist: 'Kyu Sakamoto',
    year: '1961'
  },
  {
    title: 'With Or Without You',
    artist: 'U2',
    year: '1987'
  },
  {
    title: "Can't Take My Eyes Off You",
    artist: 'Frankie Valli',
    year: '1967'
  },
  {
    title: 'Night Train',
    artist: 'Jimmy Forrest',
    year: '1952'
  },
  {
    title: 'Free Bird',
    artist: 'Lynyrd Skynyrd',
    year: '1973'
  },
  {
    title: 'Born In The U.S.A.',
    artist: 'Bruce Springsteen',
    year: '1984'
  },
  {
    title: 'For Once In My Life',
    artist: 'Stevie Wonder',
    year: '1968'
  },
  {
    title: "What A Diff'rence A Day Makes",
    artist: 'Dinah Washington',
    year: '1959'
  },
  {
    title: "What's Love Got To Do With It?",
    artist: 'Tina Tuner',
    year: '1984'
  },
  {
    title: '(Mama) He Treats Your Daughter Mean',
    artist: 'Ruth Brown',
    year: '1953'
  },
  {
    title: 'We Are The World',
    artist: 'U.S.A. For Africa',
    year: '1985'
  },
  {
    title: 'In My Life',
    artist: 'Beatles',
    year: '1965'
  },
  {
    title: 'Brown Sugar',
    artist: 'Rolling Stones',
    year: '1971'
  },
  {
    title: 'Your Song',
    artist: 'Elton John',
    year: '1970'
  },
  {
    title: 'Mrs. Robinson',
    artist: 'Simon & Garfunkel',
    year: '1968'
  },
  {
    title: 'Only You',
    artist: 'Platters',
    year: '1955'
  },
  {
    title: "Daddy's Little Girl",
    artist: 'Mills Brothers',
    year: '1950'
  },
  {
    title: 'Crazy Arms',
    artist: 'Ray Price',
    year: '1956'
  },
  {
    title: 'What A Wonderful World',
    artist: 'Louis Armstrong',
    year: '1967'
  },
  {
    title: 'Maggie May',
    artist: 'Rod Stewart',
    year: '1971'
  },
  {
    title: 'Got My Mojo Working',
    artist: 'Muddy Waters',
    year: '1957'
  },
  {
    title: 'Roundabout',
    artist: 'Yes',
    year: '1971'
  },
  {
    title: "Don't Fence Me In",
    artist: 'Bing Crosby and the Andrews Sisters',
    year: '1944'
  },
  {
    title: 'Cherry Pink And Apple Blossom White',
    artist: 'Perez Prado',
    year: '1954'
  },
  {
    title: 'Waterloo Sunset',
    artist: 'Kinks',
    year: '1967'
  },
  {
    title: 'The Weight',
    artist: 'The Band',
    year: '1968'
  },
  {
    title: 'Sugar, Sugar',
    artist: 'Archies',
    year: '1969'
  },
  {
    title: 'Music! Music! Music!',
    artist: 'Teresa Brewer',
    year: '1950'
  },
  {
    title: "Roll 'Em Pete",
    artist: 'Pete Johnson & Joe Turner',
    year: '1939'
  },
  {
    title: 'Auld Lang Syne',
    artist: 'Guy Lombardo',
    year: '1947'
  },
  {
    title: 'Tea For Two',
    artist: 'Art Tatum',
    year: '1939'
  },
  {
    title: 'Foggy Mountain Breakdown',
    artist: 'Flatt & Scruggs',
    year: '1950'
  },
  {
    title: 'Too Young',
    artist: 'Nat "King" Cole',
    year: '1951'
  },
  {
    title: 'Cool Water',
    artist: 'Sons Of The Pioneers',
    year: '1941'
  },
  {
    title: "That's My Desire",
    artist: 'Frankie Laine',
    year: '1947'
  },
  {
    title: 'One',
    artist: 'U2',
    year: '1991'
  },
  {
    title: "Don't You Want Me",
    artist: 'Human League',
    year: '1981'
  },
  {
    title: "It Wasn't God Who Made Honky Tonk Angels",
    artist: 'Kitty Wells',
    year: '1952'
  },
  {
    title: "It's All Right",
    artist: 'Impressions',
    year: '1963'
  },
  {
    title: 'La Vie en rose',
    artist: 'Edith Piaf',
    year: '1947'
  },
  {
    title: 'Le Freak',
    artist: 'Chic',
    year: '1978'
  },
  {
    title: 'Wichita Lineman',
    artist: 'Glen Campbell',
    year: '1968'
  },
  {
    title: 'Everybody Loves Somebody',
    artist: 'Dean Martin',
    year: '1964'
  },
  {
    title: 'Funky Town',
    artist: 'Lipps Inc.',
    year: '1979'
  },
  {
    title: 'Mr. Sandman',
    artist: 'Chordettes',
    year: '1954'
  },
  {
    title: 'Pink Panther Theme',
    artist: 'Henry Mancini',
    year: '1964'
  },
  {
    title: 'Goodnight, Irene',
    artist: 'Weavers with Gordon Jenkins Orchestra',
    year: '1950'
  },
  {
    title: 'Save The Last Dance For Me',
    artist: 'Drifters',
    year: '1960'
  },
  {
    title: 'Tuxedo Junction',
    artist: 'Glenn Miller',
    year: '1940'
  },
  {
    title: 'My Favorite Things',
    artist: 'John Coltrane',
    year: '1961'
  },
  {
    title: 'Strangers In The Night',
    artist: 'Frank Sinatra',
    year: '1966'
  },
  {
    title: 'Blue Monday',
    artist: 'New Order',
    year: '1983'
  },
  {
    title: 'You Are My Sunshine',
    artist: 'Jimmie Davis',
    year: '1940'
  },
  {
    title: 'Hey There',
    artist: 'Rosemary Clooney',
    year: '1954'
  },
  {
    title: 'Kansas City',
    artist: 'Wilbert Harrison',
    year: '1959'
  },
  {
    title: "If You Don't Know Me By Now",
    artist: 'Harold Melvin and the Bluenotes',
    year: '1972'
  },
  {
    title: 'Heartaches',
    artist: 'Ted Weems',
    year: '1933'
  },
  {
    title: 'Our Father',
    artist: 'Five Blind Boys',
    year: '1950'
  },
  {
    title: 'Money For Nothing',
    artist: 'Dire Straits',
    year: '1985'
  },
  {
    title: 'Tainted Love',
    artist: 'Soft Cell',
    year: '1981'
  },
  {
    title: 'Brazil',
    artist: 'Xavier Cugat',
    year: '1942'
  },
  {
    title: 'Old Time Rock and Roll',
    artist: 'Bob Seger',
    year: '1978'
  },
  {
    title: 'Yakety Yak',
    artist: 'Coasters',
    year: '1958'
  },
  {
    title: "Don't Stop 'Til You Get Enough",
    artist: 'Michael Jackson',
    year: '1979'
  },
  {
    title: 'The Old Folks At Home',
    artist: 'Len Spencer',
    year: '1892'
  },
  {
    title: 'Cheek To Cheek',
    artist: 'Fred Astaire',
    year: '1935'
  },
  {
    title: 'Sweet Caroline',
    artist: 'Neil Diamond',
    year: '1969'
  },
  {
    title: 'King Of The Road',
    artist: 'Roger Miller',
    year: '1965'
  },
  {
    title: 'A Night In Tunisia',
    artist: 'Dizzy Gillespie',
    year: '1946'
  },
  {
    title: 'Singing The Blues',
    artist: 'Guy Mitchell',
    year: '1956'
  },
  {
    title: 'Candle In The Wind (Live)',
    artist: 'Elton John',
    year: '1997'
  },
  {
    title: 'Jesus Walks',
    artist: 'Kanye West',
    year: '2004'
  },
  {
    title: 'Oye Coma Va',
    artist: 'Tito Puente',
    year: '1962'
  },
  {
    title: 'That Old Black Magic',
    artist: 'Louis Prima & Keely Smith',
    year: '1958'
  },
  {
    title: 'How High The Moon',
    artist: 'Les Paul & Mary Ford',
    year: '1951'
  },
  {
    title: 'Heart Of Glass',
    artist: 'Blondie',
    year: '1978'
  },
  {
    title: 'Deep Purple',
    artist: 'Larry Clinton (Bea Wain)',
    year: '1938'
  },
  {
    title: 'The Way We Were',
    artist: 'Barbra Streisand',
    year: '1973'
  },
  {
    title: 'Nature Boy',
    artist: 'Nat "King" Cole',
    year: '1948'
  },
  {
    title: "I'm Movin' On",
    artist: 'Hank Snow',
    year: '1950'
  },
  {
    title: 'Joy To The World',
    artist: 'Three Dog Night',
    year: '1970'
  },
  {
    title: 'Blitzkrieg Bop',
    artist: 'Ramones',
    year: '1976'
  },
  {
    title: 'We Are Family',
    artist: 'Sister Sledge',
    year: '1979'
  },
  {
    title: 'A Taste Of Honey',
    artist: 'Herb Alpert and the Tijuana Brass',
    year: '1965'
  },
  {
    title: 'Ring Of Fire',
    artist: 'Johnny Cash',
    year: '1963'
  },
  {
    title: '(They Long To Be) Close To You',
    artist: 'Carpenters',
    year: '1970'
  },
  {
    title: 'It Had To Be You',
    artist: 'Isham Jones',
    year: '1924'
  },
  {
    title: "'Round Midnight",
    artist: 'Thelonius Monk',
    year: '1947'
  },
  {
    title: 'Brown Eyed Girl',
    artist: 'Van Morrison',
    year: '1967'
  },
  {
    title: "Don't Stop Believin'",
    artist: 'Journey',
    year: '1981'
  },
  {
    title: 'The Honeydripper',
    artist: 'Joe Liggins',
    year: '1945'
  },
  {
    title: 'Heart of Gold',
    artist: 'Neil Young',
    year: '1972'
  },
  {
    title: 'Diana',
    artist: 'Paul Anka',
    year: '1957'
  },
  {
    title: 'Boogie Woogie',
    artist: 'Tommy Dorsey',
    year: '1938'
  },
  {
    title: 'Paid in Full',
    artist: 'Eric B. & Rakim',
    year: '1987'
  },
  {
    title: 'Lonely Teardrops',
    artist: 'Jackie Wilson',
    year: '1958'
  },
  {
    title: 'Mama Tried',
    artist: 'Merle Haggard',
    year: '1968'
  },
  {
    title: 'Tom Dooley',
    artist: 'Kingston Trio',
    year: '1958'
  },
  {
    title: 'Into The Groove',
    artist: 'Madonna',
    year: '1985'
  },
  {
    title: 'Hot Stuff',
    artist: 'Donna Summer',
    year: '1979'
  },
  {
    title: 'Paranoid Android',
    artist: 'Radiohead',
    year: '1997'
  },
  {
    title: 'Nuthin\' But A "G" Thang',
    artist: 'Dr. Dre',
    year: '1992'
  },
  {
    title: 'Green Eyes',
    artist: "Jimmy Dorsey (Bob Eberly & Helen O'Connell)",
    year: '1941'
  },
  {
    title: 'Take Me Home, Country Roads',
    artist: 'John Denver',
    year: '1971'
  },
  {
    title: 'Enter Sandman',
    artist: 'Metallica',
    year: '1991'
  },
  {
    title: 'California Love',
    artist: '2Pac',
    year: '1996'
  },
  {
    title: 'Walk On The Wild Side',
    artist: 'Lou Reed',
    year: '1972'
  },
  {
    title: 'Midnight Train To Georgia',
    artist: 'Gladys Knight and the Pips',
    year: '1973'
  },
  {
    title: 'Piano Man',
    artist: 'Billy Joel',
    year: '1973'
  },
  {
    title: "At The Woodchopper's Ball",
    artist: 'Woody Herman',
    year: '1939'
  },
  {
    title: 'Rags To Riches',
    artist: 'Tony Bennett',
    year: '1953'
  },
  {
    title: 'All Along The Watchtower',
    artist: 'Jimi Hendrix',
    year: '1967'
  },
  {
    title: 'Friends In Low Places',
    artist: 'Garth Brooks',
    year: '1990'
  },
  {
    title: 'Theme From New York, New York',
    artist: 'Frank Sinatra',
    year: '1980'
  },
  {
    title: 'Dancing Queen',
    artist: 'Abba',
    year: '1976'
  },
  {
    title: 'Losing My Religion',
    artist: 'R.E.M.',
    year: '1991'
  },
  {
    title: "Coal Miner's Daughter",
    artist: 'Loretta Lynn',
    year: '1970'
  },
  {
    title: 'The Wild Side Of Life',
    artist: 'Hank Thompson',
    year: '1952'
  },
  {
    title: 'With A Little Help From My Friends',
    artist: 'Joe Cocker',
    year: '1968'
  },
  {
    title: 'Happy Trails',
    artist: 'Roy Rogers & Dale Evans',
    year: '1952'
  },
  {
    title: 'Home For The Holidays',
    artist: 'Perry Como',
    year: '1954'
  },
  {
    title: 'Frenesi',
    artist: 'Artie Shaw',
    year: '1945'
  },
  {
    title: 'Born To Be Alive',
    artist: 'Patrick Hernandez',
    year: '1979'
  },
  {
    title: 'Love Will Tear Us Apart',
    artist: 'Joy Division',
    year: '1980'
  },
  {
    title: 'School Day (Ring! Ring! Goes The Bell)',
    artist: 'Chuck Berry',
    year: '1957'
  },
  {
    title: 'Misty',
    artist: 'Johnny Mathis',
    year: '1959'
  },
  {
    title: 'Doo Wop (That Thing)',
    artist: 'Lauryn Hill',
    year: '1998'
  },
  {
    title: 'Waterfalls',
    artist: 'TLC',
    year: '1994'
  },
  {
    title: 'Hold On',
    artist: 'En Vogue',
    year: '1990'
  },
  {
    title: 'Empire State Of Mind',
    artist: 'Jay-Z featuring Alicia Keys',
    year: '2009'
  },
  {
    title: 'The Cattle Call',
    artist: 'Eddy Arnold',
    year: '1945'
  },
  {
    title: 'On Broadway',
    artist: 'Drifters',
    year: '1963'
  },
  {
    title: 'You Oughta Know',
    artist: 'Alanis Morissette',
    year: '1995'
  },
  {
    title: 'Crazy',
    artist: 'Gnarls Barkley',
    year: '2006'
  },
  {
    title: "The Grand Old Rag (You're A Grand Old Flag)",
    artist: 'Billy Murray',
    year: '1906'
  },
  {
    title: 'Always On My Mind',
    artist: 'Willie Nelson',
    year: '1982'
  },
  {
    title: 'Fuck You (Forget You)',
    artist: 'Cee Lo Green',
    year: '2010'
  },
  {
    title: 'The Wind Beneath My Wings',
    artist: 'Bette Midler',
    year: '1988'
  },
  {
    title: 'Nothing Compares 2 U',
    artist: "Sinead O'Connor",
    year: '1990'
  },
  {
    title: 'Gold Digger',
    artist: 'Kanye West',
    year: '2005'
  },
  {
    title: 'Hard Knock Life (Ghetto Anthem)',
    artist: 'Jay-Z',
    year: '1998'
  },
  {
    title: 'Hit The Road Jack',
    artist: 'Ray Charles',
    year: '1961'
  },
  {
    title: 'Rock And Roll Music',
    artist: 'Chuck Berry',
    year: '1957'
  },
  {
    title: 'Crazy In Love',
    artist: 'Beyoncé',
    year: '2003'
  },
  {
    title: 'Jeremy',
    artist: 'Pearl Jam',
    year: '1991'
  },
  {
    title: "You Made Me Love You, I Didn't Want To Do It",
    artist: 'Al Jolson',
    year: '1913'
  },
  {
    title: 'Wonderwall',
    artist: 'Oasis',
    year: '1995'
  },
  {
    title: 'No Diggity',
    artist: 'BLACKstreet',
    year: '1996'
  },
  {
    title: 'Under The Bridge',
    artist: 'Red Hot Chili Peppers',
    year: '1991'
  },
  {
    title: "It's Too Soon To Know",
    artist: 'Orioles',
    year: '1948'
  },
  {
    title: "Gangsta's Paradise",
    artist: 'Coolio featuring L.V.',
    year: '1995'
  },
  {
    title: 'Turn On Your Love Light',
    artist: 'Bobby "Blue" Bland',
    year: '1961'
  }
]
