import React, { useState, useEffect } from 'react';
import LessonEditorMulti from './components/LessonEditorMulti';
import LessonPreview from './components/LessonPreview';
import { loadLesson } from './utils/db';

function App() {
  const [mode, setMode] = useState('preview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        // Kiểm tra IndexedDB có hoạt động không
        const isDBAvailable = await loadLesson();
        console.log('Database status:', isDBAvailable);
      } catch (err) {
        console.error('Lỗi khởi tạo:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #A1E3D8 0%, #FFF5BA 100%)',
        fontSize: '1.5rem',
        color: '#2A7B90'
      }}>
        🎵 Đang tải ứng dụng...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #A1E3D8 0%, #FFF5BA 100%)',
        padding: '20px'
      }}>
        <h1 style={{ color: '#ff4444', marginBottom: '20px' }}>
          ❌ Có lỗi xảy ra
        </h1>
        <p style={{ color: '#666', textAlign: 'center' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#97DECE',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          🔄 Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #A1E3D8 0%, #FFF5BA 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '30px',
        padding: '32px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem',
          color: '#2A7B90',
          marginBottom: '32px'
        }}>
          🎓 Bé Học Tiếng Anh
        </h1>
        
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center', 
          marginBottom: '32px'
        }}>
          <button 
            onClick={() => setMode('editor')}
            style={{
              padding: '16px 32px',
              fontSize: '20px',
              backgroundColor: mode === 'editor' ? '#FF9EAA' : '#FFE5E5',
              color: '#444',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            ✍️ Soạn Bài
          </button>
          <button
            onClick={() => setMode('preview')} 
            style={{
              padding: '16px 32px',
              fontSize: '20px',
              backgroundColor: mode === 'preview' ? '#97DECE' : '#E3F4F4',
              color: '#444',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            👶 Bé Học Bài
          </button>
        </div>

        {mode === 'editor' ? <LessonEditorMulti /> : <LessonPreview />}
      </div>
    </div>
  );
}

export default App;
