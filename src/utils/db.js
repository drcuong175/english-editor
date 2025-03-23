const DB_NAME = 'EnglishLessonDB';
const DB_VERSION = 1;
const STORE_NAME = 'lessons';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject('Lỗi khi mở IndexedDB');
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

export const saveLesson = async (lesson, currentIndex) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await Promise.all([
      store.put(lesson, 'currentLesson'),
      store.put(currentIndex, 'currentIndex')
    ]);

    return true;
  } catch (error) {
    console.error('Lỗi khi lưu bài học:', error);
    return false;
  }
};

export const loadLesson = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const lesson = await store.get('currentLesson');
    const currentIndex = await store.get('currentIndex');

    return {
      lesson: lesson || null,
      currentIndex: currentIndex || 0
    };
  } catch (error) {
    console.error('Lỗi khi tải bài học:', error);
    return { lesson: null, currentIndex: 0 };
  }
};

export const clearLesson = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await Promise.all([
      store.delete('currentLesson'),
      store.delete('currentIndex')
    ]);

    return true;
  } catch (error) {
    console.error('Lỗi khi xóa bài học:', error);
    return false;
  }
}; 