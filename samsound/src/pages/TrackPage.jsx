import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Repeat, MessageCircle, Share2, DollarSign } from 'lucide-react';
import { mockTracks } from '../data/mockData';
import Waveform from '../components/Waveform';
import { useApp } from '../context/AppContext';

export default function TrackPage() {
  const { trackId } = useParams();
  const { setCurrentTrack, setIsPlaying } = useApp();
  const [liked, setLiked] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportAmount, setSupportAmount] = useState(10);

  const track = mockTracks.find(t => t.id === trackId) || mockTracks[0];

  const handlePlay = () => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="track-page">
      <div className="track-header">
        <img src={track.coverArt} alt={track.title} className="track-cover-large" />
        
        <div className="track-details-large">
          <h1>{track.title}</h1>
          <p className="artist-name">{track.artistName}</p>
          <p className="track-description">{track.description}</p>
          
          <div className="track-meta">
            <span className="genre-tag">{track.genre}</span>
            <span className="date">{formatDate(track.createdAt)}</span>
          </div>

          <div className="track-actions-large">
            <button className="play-large-btn" onClick={handlePlay}>
              Play
            </button>
            
            <button 
              className={`action-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart size={20} fill={liked ? '#9333ea' : 'none'} />
              {formatNumber(track.likes + (liked ? 1 : 0))}
            </button>
            
            <button className="action-btn">
              <MessageCircle size={20} />
              {track.comments.length}
            </button>
            
            <button className="action-btn">
              <Repeat size={20} />
              {formatNumber(track.reposts)}
            </button>
            
            <button className="action-btn">
              <Share2 size={20} />
              Поделиться
            </button>
            
            <button 
              className="action-btn support-btn"
              onClick={() => setShowSupportModal(true)}
            >
              <DollarSign size={20} />
              Поддержать
            </button>
          </div>
        </div>
      </div>

      <div className="waveform-section">
        <Waveform 
          waveform={track.waveform}
          currentTime={0}
          duration={track.duration}
          onSeek={() => {}}
        />
      </div>

      <section className="comments-section">
        <h2>Комментарии ({track.comments.length})</h2>
        <div className="comments-list">
          {track.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">
                {comment.username.charAt(0).toUpperCase()}
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.username}</span>
                  <span className="comment-time">
                    {Math.floor(comment.timestamp / 1000 / 60)}:{(comment.timestamp / 1000 % 60).toFixed(0).padStart(2, '0')}
                  </span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showSupportModal && (
        <div className="modal-overlay" onClick={() => setShowSupportModal(false)}>
          <div className="support-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Поддержать артиста</h2>
            <p>Выберите сумму поддержки от $1 до $1000</p>
            
            <div className="amount-presets">
              {[5, 10, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className={`amount-btn ${supportAmount === amount ? 'selected' : ''}`}
                  onClick={() => setSupportAmount(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            <div className="custom-amount">
              <label>Или введите свою сумму:</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={supportAmount}
                onChange={(e) => setSupportAmount(parseInt(e.target.value))}
              />
            </div>
            
            <div className="modal-actions">
              <button onClick={() => setShowSupportModal(false)}>Отмена</button>
              <button className="confirm-btn">
                Поддержать на ${supportAmount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
