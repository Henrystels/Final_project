import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Upload, User, BarChart3, Music } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import { useApp } from '../context/AppContext';

export default function Layout({ children }) {
  const location = useLocation();
  const { currentTrack } = useApp();

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Главная' },
    { path: '/search', icon: <Search size={20} />, label: 'Поиск' },
    { path: '/upload', icon: <Upload size={20} />, label: 'Загрузить' },
    { path: '/profile/user1', icon: <User size={20} />, label: 'Профиль' },
    { path: '/insights', icon: <BarChart3 size={20} />, label: 'Статистика' }
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <Music size={28} />
          <span>SamSound</span>
        </div>
        
        <nav className="main-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="user-menu">
          <Link to="/profile/user1" className="user-avatar">
            <img src="https://via.placeholder.com/40/9333ea/ffffff?text=NA" alt="Profile" />
          </Link>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      {currentTrack && (
        <footer className="player-footer">
          <AudioPlayer track={currentTrack} />
        </footer>
      )}
    </div>
  );
}
