import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Music, Users, UserPlus, CheckCircle, Heart, Repeat, MessageCircle } from 'lucide-react';
import { mockUsers, mockTracks } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const { artistId } = useParams();
  const { setCurrentTrack, setIsPlaying } = useApp();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const user = mockUsers.find(u => u.id === artistId) || mockUsers[0];
  const userTracks = mockTracks.filter(t => t.artistId === artistId);

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.avatar} alt={user.displayName} className="profile-avatar" />
        <div className="profile-info">
          <div className="profile-name">
            <h1>{user.displayName}</h1>
            {user.isVerified && <CheckCircle size={24} className="verified-badge" />}
          </div>
          <p className="profile-bio">{user.bio}</p>
          
          <div className="profile-stats">
            <span className="stat-item">
              <Music size={18} /> {userTracks.length} треков
            </span>
            <span className="stat-item">
              <Users size={18} /> {formatNumber(user.followers)} подписчиков
            </span>
            <span className="stat-item">
              <UserPlus size={18} /> {user.following} подписок
            </span>
          </div>

          <button 
            className={`follow-btn ${isFollowing ? 'following' : ''}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? 'Вы подписаны' : 'Подписаться'}
          </button>
        </div>
      </div>

      <section className="profile-tracks">
        <h2>Треки</h2>
        {userTracks.length > 0 ? (
          <div className="tracks-list">
            {userTracks.map((track) => (
              <div key={track.id} className="track-row">
                <img src={track.coverArt} alt={track.title} className="track-thumbnail" />
                <div className="track-details">
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                </div>
                <div className="track-actions">
                  <button className="play-btn" onClick={() => handlePlay(track)}>
                    <Music size={20} />
                  </button>
                  <span className="action-stat">
                    <Heart size={16} /> {formatNumber(track.likes)}
                  </span>
                  <span className="action-stat">
                    <MessageCircle size={16} /> {track.comments.length}
                  </span>
                  <span className="action-stat">
                    <Repeat size={16} /> {formatNumber(track.reposts)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tracks">У этого артиста пока нет треков</p>
        )}
      </section>
    </div>
  );
}
