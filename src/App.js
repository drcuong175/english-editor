import React, { useState } from 'react';
import LessonEditorMulti from './components/LessonEditorMulti';
import LessonPreview from './components/LessonPreview';

function App() {
  const [mode, setMode] = useState('preview'); // 'editor' hoặc 'preview'

  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: '0 auto', 
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '2.5rem',
        color: '#2A7B90',
        marginBottom: '32px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
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
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
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
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          👶 Bé Học Bài
        </button>
      </div>

      <div style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '30px',
        padding: '32px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        {mode === 'editor' ? <LessonEditorMulti /> : <LessonPreview />}
      </div>
    </div>
  );
}

export default App;
