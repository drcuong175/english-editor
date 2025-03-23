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
    <div style={{ padding: 24 }}>
      <h2>📝 Soạn bài học</h2>
      
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Tên bài học:
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            style={{ marginLeft: 8, padding: 8, width: 300 }}
          />
        </label>
      </div>

      {entries.map((entry, idx) => (
        <div key={idx} style={{ marginBottom: 32, padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
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

      <div style={{ marginTop: 24 }}>
        <button 
          onClick={addNewEntry}
          style={{ 
            marginRight: 16, 
            padding: '8px 16px', 
            fontSize: 16,
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          ➕ Thêm từ mới
        </button>
        
        <button 
          onClick={saveLesson}
          disabled={!lessonName || entries.length === 0}
          style={{ 
            padding: '8px 16px', 
            fontSize: 16,
            backgroundColor: (!lessonName || entries.length === 0) ? '#ddd' : '#4CAF50',
            color: (!lessonName || entries.length === 0) ? '#666' : 'white',
            border: 'none',
            borderRadius: 4,
            cursor: (!lessonName || entries.length === 0) ? 'not-allowed' : 'pointer'
          }}
        >
          💾 Lưu bài học
        </button>
      </div>
    </div>
  );
};

export default LessonEditorMulti;
