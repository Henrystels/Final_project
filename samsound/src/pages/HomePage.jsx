import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Repeat, MessageCircle } from 'lucide-react';
import { mockTracks, mockUsers } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { setCurrentTrack, setIsPlaying } = useApp();
  const [likedTracks, setLikedTracks] = useState(new Set());

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const toggleLike = (trackId) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Добро пожаловать в SamSound</h1>
        <p>Платформа для музыкантов и слушателей</p>
      </section>

      <section className="tracks-section">
        <h2>Популярные треки</h2>
        <div className="tracks-grid">
          {mockTracks.map((track) => (
            <div key={track.id} className="track-card">
              <div className="track-cover">
                <img src={track.coverArt} alt={track.title} />
                <button 
                  className="play-overlay"
                  onClick={() => handlePlay(track)}
                >
                  <Play size={48} fill="white" />
                </button>
              </div>
              
              <div className="track-info">
                <Link to={`/track/${track.id}`} className="track-title">
                  {track.title}
                </Link>
                <Link to={`/profile/${track.artistId}`} className="track-artist">
                  {track.artistName}
                </Link>
                
                <div className="track-stats">
                  <span className="stat">
                    <Play size={14} /> {formatNumber(track.plays)}
                  </span>
                  <button 
                    className={`stat like-btn ${likedTracks.has(track.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(track.id)}
                  >
                    <Heart size={14} fill={likedTracks.has(track.id) ? '#9333ea' : 'none'} /> 
                    {formatNumber(track.likes + (likedTracks.has(track.id) ? 1 : 0))}
                  </button>
                  <span className="stat">
                    <MessageCircle size={14} /> {track.comments.length}
                  </span>
                  <span className="stat">
                    <Repeat size={14} /> {formatNumber(track.reposts)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="genres-section">
        <h2>Жанры</h2>
        <div className="genres-list">
          {['Hip-Hop', 'Electronic', 'Rock', 'Pop', 'R&B', 'Jazz'].map((genre) => (
            <Link key={genre} to={`/search?genre=${genre}`} className="genre-tag">
              {genre}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
