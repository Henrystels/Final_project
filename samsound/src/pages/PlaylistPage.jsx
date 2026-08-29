import { useParams } from 'react-router-dom';
import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { mockPlaylists, mockTracks } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const { setCurrentTrack, setIsPlaying } = useApp();
  
  const playlist = mockPlaylists.find(p => p.id === playlistId) || mockPlaylists[0];
  const playlistTracks = mockTracks.filter(t => playlist.tracks.includes(t.id));

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    const totalMs = playlistTracks.reduce((acc, track) => acc + track.duration, 0);
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    if (hours > 0) {
      return `${hours}ч ${minutes}мин`;
    }
    return `${minutes} мин`;
  };

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <div className="playlist-cover">
          🎵
        </div>
        <div className="playlist-info">
          <span className="playlist-type">Плейлист</span>
          <h1>{playlist.name}</h1>
          <p>{playlistTracks.length} треков • {getTotalDuration()}</p>
        </div>
      </div>

      <button 
        className="play-all-btn"
        onClick={() => playlistTracks[0] && handlePlay(playlistTracks[0])}
      >
        <Play size={20} fill="white" />
        Слушать всё
      </button>

      <div className="playlist-tracks">
        <div className="track-list-header">
          <span>#</span>
          <span>Название</span>
          <span><Clock size={16} /></span>
        </div>
        
        {playlistTracks.map((track, index) => (
          <div 
            key={track.id} 
            className="playlist-track"
            onDoubleClick={() => handlePlay(track)}
          >
            <span className="track-number">{index + 1}</span>
            <img src={track.coverArt} alt={track.title} />
            <div className="track-info">
              <h3>{track.title}</h3>
              <p>{track.artistName}</p>
            </div>
            <span className="track-duration">{formatDuration(track.duration)}</span>
            <button className="more-btn">
              <MoreHorizontal size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
