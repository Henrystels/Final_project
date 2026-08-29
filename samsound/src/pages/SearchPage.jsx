import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Music, User } from 'lucide-react';
import { mockTracks, mockUsers, genres } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCurrentTrack, setIsPlaying } = useApp();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [searchType, setSearchType] = useState('all');

  useEffect(() => {
    if (searchParams.get('genre')) {
      setSelectedGenre(searchParams.get('genre'));
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedGenre) params.set('genre', selectedGenre);
    setSearchParams(params);
  };

  const filteredTracks = mockTracks.filter(track => {
    const matchesQuery = !searchQuery || 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artistName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || track.genre === selectedGenre;
    return matchesQuery && matchesGenre;
  });

  const filteredUsers = mockUsers.filter(user => {
    return !searchQuery || 
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="search-page">
      <h1>Поиск</h1>
      
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <SearchIcon size={20} />
          <input
            type="text"
            placeholder="Поиск треков, артистов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-select"
        >
          <option value="">Все жанры</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        
        <button type="submit">Найти</button>
      </form>

      <div className="search-types">
        <button 
          className={`type-btn ${searchType === 'all' ? 'active' : ''}`}
          onClick={() => setSearchType('all')}
        >
          Все
        </button>
        <button 
          className={`type-btn ${searchType === 'tracks' ? 'active' : ''}`}
          onClick={() => setSearchType('tracks')}
        >
          <Music size={16} /> Треки
        </button>
        <button 
          className={`type-btn ${searchType === 'artists' ? 'active' : ''}`}
          onClick={() => setSearchType('artists')}
        >
          <User size={16} /> Артисты
        </button>
      </div>

      {(searchType === 'all' || searchType === 'tracks') && (
        <section className="search-results">
          <h2>Треки ({filteredTracks.length})</h2>
          <div className="results-list">
            {filteredTracks.map((track) => (
              <div key={track.id} className="result-item">
                <img src={track.coverArt} alt={track.title} />
                <div className="result-info">
                  <h3>{track.title}</h3>
                  <p>{track.artistName}</p>
                </div>
                <button onClick={() => handlePlay(track)}>
                  <Music size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {(searchType === 'all' || searchType === 'artists') && (
        <section className="search-results">
          <h2>Артисты ({filteredUsers.length})</h2>
          <div className="results-list">
            {filteredUsers.map((user) => (
              <div key={user.id} className="result-item artist-result">
                <img src={user.avatar} alt={user.displayName} />
                <div className="result-info">
                  <h3>{user.displayName}</h3>
                  <p>@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!searchQuery && !selectedGenre && (
        <section className="browse-genres">
          <h2>Популярные жанры</h2>
          <div className="genres-grid">
            {genres.slice(0, 8).map((genre) => (
              <button
                key={genre}
                className="genre-card"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
