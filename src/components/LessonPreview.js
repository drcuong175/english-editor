import React, { useState, useRef } from 'react';

const LessonPreview = () => {
  const [lesson, setLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const lessonData = JSON.parse(e.target.result);
          setLesson(lessonData);
          setCurrentIndex(0);
        } catch (error) {
          alert('File không hợp lệ!');
        }
      };
      reader.readAsText(file);
    }
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  const nextWord = () => {
    if (lesson && currentIndex < lesson.entries.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {!lesson ? (
        <div style={{ 
          textAlign: 'center',
          padding: '48px 0'
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#2A7B90',
            marginBottom: '32px'
          }}>
            👶 Chọn Bài Học
          </h2>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            style={{
              padding: '20px 40px',
              fontSize: '1.5rem',
              backgroundColor: '#97DECE',
              color: '#444',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto'
            }}
          >
            📂 Tải Lên Bài Học
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '2rem',
            color: '#2A7B90',
            marginBottom: '32px'
          }}>
            {lesson.name}
          </h2>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            padding: '32px',
            backgroundColor: '#FFF5BA',
            borderRadius: '30px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}>
            {lesson.entries[currentIndex].image && (
              <img
                src={lesson.entries[currentIndex].image}
                alt={lesson.entries[currentIndex].word}
                style={{
                  width: '100%',
                  maxHeight: 300,
                  objectFit: 'contain',
                  marginBottom: 16,
                  borderRadius: 8
                }}
              />
            )}
            
            <h3 style={{ textAlign: 'center', fontSize: 32, margin: '16px 0' }}>
              {lesson.entries[currentIndex].word}
            </h3>
            
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <button
                onClick={() => speakText(lesson.entries[currentIndex].word)}
                style={{
                  padding: '8px 16px',
                  fontSize: 18,
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
              >
                🔊 Phát âm
              </button>
            </div>

            {getYouTubeEmbedUrl(lesson.entries[currentIndex].videoLink) && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginTop: 16 }}>
                <iframe
                  src={getYouTubeEmbedUrl(lesson.entries[currentIndex].videoLink)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 8
                  }}
                  title="YouTube video"
                  allowFullScreen
                />
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: 24 
            }}>
              <button
                onClick={prevWord}
                disabled={currentIndex === 0}
                style={{
                  padding: '8px 16px',
                  fontSize: 16,
                  backgroundColor: currentIndex === 0 ? '#ddd' : '#2196F3',
                  color: currentIndex === 0 ? '#666' : 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ⬅️ Từ trước
              </button>
              <button
                onClick={nextWord}
                disabled={currentIndex === lesson.entries.length - 1}
                style={{
                  padding: '8px 16px',
                  fontSize: 16,
                  backgroundColor: currentIndex === lesson.entries.length - 1 ? '#ddd' : '#2196F3',
                  color: currentIndex === lesson.entries.length - 1 ? '#666' : 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: currentIndex === lesson.entries.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Từ tiếp theo ➡️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPreview; 