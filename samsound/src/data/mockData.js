// Mock data for SamSound platform

export const mockUsers = [
  {
    id: 'user1',
    username: 'newartist',
    displayName: 'New Artist',
    avatar: 'https://via.placeholder.com/150/9333ea/ffffff?text=NA',
    bio: 'Начинающий музыкант, ищу свою аудиторию',
    followers: 125,
    following: 45,
    isVerified: false,
    subscriptionTier: 'free'
  },
  {
    id: 'user2',
    username: 'kanyewest',
    displayName: 'Kanye West',
    avatar: 'https://via.placeholder.com/150/000000/ffffff?text=KW',
    bio: 'Legendary artist',
    followers: 5000000,
    following: 100,
    isVerified: true,
    subscriptionTier: 'kanyewest-like'
  }
];

export const mockTracks = [
  {
    id: 'track1',
    title: 'My First Beat',
    artistId: 'user1',
    artistName: 'New Artist',
    genre: 'Hip-Hop',
    duration: 185000,
    coverArt: 'https://via.placeholder.com/300/9333ea/ffffff?text=Track+1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Мой первый трек, жду вашу обратную связь!',
    createdAt: '2025-01-15T10:00:00Z',
    plays: 234,
    likes: 45,
    comments: [
      { id: 'c1', userId: 'user2', username: 'MusicLover', text: 'Отличное начало!', timestamp: 15000 },
      { id: 'c2', userId: 'user3', username: 'BeatMaker', text: 'Бас можно улучшить', timestamp: 45000 }
    ],
    reposts: 12,
    waveform: Array(100).fill(0).map(() => Math.random() * 100)
  },
  {
    id: 'track2',
    title: 'Summer Vibes',
    artistId: 'user1',
    artistName: 'New Artist',
    genre: 'Electronic',
    duration: 240000,
    coverArt: 'https://via.placeholder.com/300/3b82f6/ffffff?text=Track+2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'Летнее настроение в каждом бите',
    createdAt: '2025-01-20T14:30:00Z',
    plays: 567,
    likes: 89,
    comments: [],
    reposts: 34,
    waveform: Array(100).fill(0).map(() => Math.random() * 100)
  },
  {
    id: 'track3',
    title: 'Famous Track',
    artistId: 'user2',
    artistName: 'Kanye West',
    genre: 'Hip-Hop',
    duration: 210000,
    coverArt: 'https://via.placeholder.com/300/000000/ffffff?text=Famous',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'Classic hit',
    createdAt: '2024-12-01T08:00:00Z',
    plays: 1500000,
    likes: 250000,
    comments: [],
    reposts: 50000,
    waveform: Array(100).fill(0).map(() => Math.random() * 100)
  }
];

export const mockPlaylists = [
  {
    id: 'playlist1',
    name: 'My Favorites',
    userId: 'user1',
    tracks: ['track1', 'track2'],
    isPublic: true,
    createdAt: '2025-01-10T12:00:00Z'
  }
];

export const mockInsights = {
  trackId: 'track1',
  totalPlays: 234,
  totalLikes: 45,
  totalComments: 2,
  totalReposts: 12,
  topFans: [
    { userId: 'user2', username: 'MusicLover', plays: 15, supportAmount: 50 },
    { userId: 'user3', username: 'BeatMaker', plays: 10, supportAmount: 25 }
  ],
  locations: [
    { country: 'Russia', percentage: 45 },
    { country: 'USA', percentage: 25 },
    { country: 'Germany', percentage: 15 },
    { country: 'Other', percentage: 15 }
  ],
  sources: [
    { source: 'Direct', percentage: 40 },
    { source: 'Playlist', percentage: 30 },
    { source: 'Social Media', percentage: 20 },
    { source: 'Search', percentage: 10 }
  ],
  dailyPlays: Array(30).fill(0).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    plays: Math.floor(Math.random() * 50) + 5
  }))
};

export const genres = [
  'Hip-Hop', 'Electronic', 'Rock', 'Pop', 'R&B', 
  'Jazz', 'Classical', 'Country', 'Reggae', 'Metal',
  'Indie', 'Alternative', 'House', 'Techno', 'Ambient'
];

export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Загрузка до 3 часов аудио',
      'Базовая статистика',
      'Рекламные баннеры',
      'Комиссия 10% на донаты'
    ]
  },
  {
    id: 'listener-prime',
    name: 'Listener Prime',
    price: 299,
    period: 'month',
    features: [
      'Без рекламы',
      'Офлайн-прослушивание',
      'Высокое качество звука'
    ]
  },
  {
    id: 'kanyewest-like',
    name: 'KanyeWest-like',
    price: 4499,
    period: 'year',
    features: [
      '100% роялти артистам',
      'Без ограничений на загрузку',
      'Fan Support',
      'Продвинутая статистика',
      'Верифицированный профиль'
    ]
  }
];
