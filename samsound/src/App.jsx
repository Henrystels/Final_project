import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import UploadPage from './pages/UploadPage'
import TrackPage from './pages/TrackPage'
import SearchPage from './pages/SearchPage'
import PlaylistPage from './pages/PlaylistPage'
import InsightsPage from './pages/InsightsPage'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:artistId" element={<ProfilePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/track/:trackId" element={<TrackPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
