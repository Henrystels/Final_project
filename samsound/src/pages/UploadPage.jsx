import { useState } from 'react';
import { Upload as UploadIcon, Music, Tag, Image, FileText, CheckCircle } from 'lucide-react';
import { genres } from '../data/mockData';

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1);
  const [audioFile, setAudioFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    coverArt: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAudioDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, coverArt: file });
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    setIsUploading(false);
    setUploadStep(4);
  };

  return (
    <div className="upload-page">
      <h1>Загрузить трек</h1>
      
      <div className="upload-steps">
        <div className={`step ${uploadStep >= 1 ? 'active' : ''}`}>
          <Music size={24} />
          <span>Аудиофайл</span>
        </div>
        <div className={`step ${uploadStep >= 2 ? 'active' : ''}`}>
          <Tag size={24} />
          <span>Метаданные</span>
        </div>
        <div className={`step ${uploadStep >= 3 ? 'active' : ''}`}>
          <Image size={24} />
          <span>Обложка</span>
        </div>
      </div>

      {uploadStep === 1 && (
        <div 
          className="upload-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleAudioDrop}
        >
          <UploadIcon size={64} />
          <h3>Перетащите аудиофайл сюда</h3>
          <p>Поддерживаемые форматы: MP3, WAV, AIFF</p>
          <p className="limit">До 3 часов на бесплатном тарифе</p>
          
          <input 
            type="file" 
            accept="audio/*" 
            onChange={(e) => setAudioFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="audio-input"
          />
          <label htmlFor="audio-input" className="upload-btn">
            Выбрать файл
          </label>
          
          {audioFile && (
            <div className="file-info">
              <CheckCircle size={20} />
              <span>{audioFile.name}</span>
              <button onClick={() => setUploadStep(2)}>Далее</button>
            </div>
          )}
        </div>
      )}

      {uploadStep === 2 && (
        <div className="metadata-form">
          <div className="form-group">
            <label>Название трека</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Введите название"
            />
          </div>
          
          <div className="form-group">
            <label>Жанр</label>
            <select
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            >
              <option value="">Выберите жанр</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Расскажите о своём треке..."
              rows={4}
            />
          </div>
          
          <div className="form-actions">
            <button onClick={() => setUploadStep(1)}>Назад</button>
            <button onClick={() => setUploadStep(3)} disabled={!formData.title || !formData.genre}>
              Далее
            </button>
          </div>
        </div>
      )}

      {uploadStep === 3 && (
        <div className="cover-upload">
          <div 
            className="cover-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleCoverDrop}
          >
            {formData.coverArt ? (
              <img 
                src={URL.createObjectURL(formData.coverArt)} 
                alt="Cover preview" 
                className="cover-preview"
              />
            ) : (
              <>
                <Image size={64} />
                <p>Перетащите обложку или нажмите для выбора</p>
                <p className="hint">Рекомендуемый размер: 1400x1400px</p>
              </>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFormData({ ...formData, coverArt: e.target.files[0] })}
              style={{ display: 'none' }}
              id="cover-input"
            />
            <label htmlFor="cover-input" className="upload-btn">
              Выбрать изображение
            </label>
          </div>
          
          <div className="form-actions">
            <button onClick={() => setUploadStep(2)}>Назад</button>
            <button onClick={handleSubmit} disabled={isUploading}>
              {isUploading ? `Загрузка... ${uploadProgress}%` : 'Опубликовать'}
            </button>
          </div>
        </div>
      )}

      {uploadStep === 4 && (
        <div className="upload-success">
          <CheckCircle size={80} className="success-icon" />
          <h2>Трек успешно загружен!</h2>
          <p>Ваш трек теперь доступен для прослушивания</p>
          <button onClick={() => {
            setUploadStep(1);
            setAudioFile(null);
            setFormData({ title: '', genre: '', description: '', coverArt: null });
          }}>
            Загрузить ещё один трек
          </button>
        </div>
      )}

      {isUploading && uploadStep === 3 && (
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
        </div>
      )}
    </div>
  );
}
