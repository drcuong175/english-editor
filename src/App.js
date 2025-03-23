import React, { useState } from 'react';
import LessonEditorMulti from './components/LessonEditorMulti';
import LessonPreview from './components/LessonPreview';

function App() {
  const [mode, setMode] = useState("editor");

  return (
    <div style={{ padding: 24 }}>
      <h1>📚 Ứng dụng học tiếng Anh cho bé</h1>

      <div style={{ marginBottom: 24 }}>
        <button onClick={() => setMode("editor")}>📝 Soạn bài</button>
        <button onClick={() => setMode("preview")} style={{ marginLeft: 12 }}>
          👶 Bé học bài
        </button>
      </div>

      <hr />

      {mode === "editor" ? <LessonEditorMulti /> : <LessonPreview />}
    </div>
  );
}

export default App;
