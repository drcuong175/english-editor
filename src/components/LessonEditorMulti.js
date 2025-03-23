import React, { useState } from "react";

const LessonEditorMulti = () => {
  const [lessonName, setLessonName] = useState('');
  const [entries, setEntries] = useState([]);

  const addNewEntry = () => {
    setEntries([...entries, { word: '', image: '', videoLink: '' }]);
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, idx) => idx !== index);
    setEntries(newEntries);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleEntryChange(index, 'image', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  const saveLesson = () => {
    const lessonData = {
      name: lessonName,
      entries: entries
    };
    
    const blob = new Blob([JSON.stringify(lessonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lessonName.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2rem',
        color: '#2A7B90',
        marginBottom: '32px'
      }}>
        ✍️ Soạn Bài Học Tiếng Anh
      </h2>
      
      <div style={{ marginBottom: '32px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '16px',
          fontSize: '1.2rem',
          color: '#444'
        }}>
          📚 Tên bài học:
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            style={{ 
              marginLeft: '16px',
              padding: '12px 20px',
              fontSize: '1.1rem',
              width: '300px',
              borderRadius: '15px',
              border: '2px solid #A1E3D8',
              outline: 'none'
            }}
          />
        </label>
      </div>

      {entries.map((entry, idx) => (
        <div key={idx} style={{ 
          marginBottom: '32px',
          padding: '24px',
          backgroundColor: '#FFF5BA',
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button
              onClick={() => removeEntry(idx)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              🗑️ Xóa
            </button>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Từ vựng:
              <input
                type="text"
                value={entry.word}
                onChange={(e) => handleEntryChange(idx, 'word', e.target.value)}
                style={{ marginLeft: 8, padding: 8, width: 200 }}
              />
              <button 
                onClick={() => speakText(entry.word)}
                style={{ marginLeft: 8, padding: '4px 8px' }}
              >
                🔊 Nghe
              </button>
            </label>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Hình ảnh:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(idx, e)}
                style={{ marginLeft: 8 }}
              />
            </label>
            {entry.image && (
              <img 
                src={entry.image} 
                alt={entry.word}
                style={{ maxWidth: 200, marginTop: 8, borderRadius: 4 }} 
              />
            )}
          </div>

          <div>
            <label style={{ display: 'block' }}>
              Link video YouTube:
              <input
                type="text"
                value={entry.videoLink}
                onChange={(e) => handleEntryChange(idx, 'videoLink', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{ marginLeft: 8, padding: 8, width: 300 }}
              />
            </label>
          </div>
        </div>
      ))}

      <div style={{ 
        marginTop: '32px',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={addNewEntry}
          style={{ 
            padding: '16px 32px',
            fontSize: '1.2rem',
            backgroundColor: '#97DECE',
            color: '#444',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          ➕ Thêm Từ Mới
        </button>
        
        <button 
          onClick={saveLesson}
          disabled={!lessonName || entries.length === 0}
          style={{ 
            padding: '16px 32px',
            fontSize: '1.2rem',
            backgroundColor: (!lessonName || entries.length === 0) ? '#ddd' : '#FF9EAA',
            color: (!lessonName || entries.length === 0) ? '#666' : '#444',
            border: 'none',
            borderRadius: '15px',
            cursor: (!lessonName || entries.length === 0) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          💾 Lưu Bài Học
        </button>
      </div>
    </div>
  );
};

export default LessonEditorMulti;
