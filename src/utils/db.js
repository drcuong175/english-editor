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

// Hàm kiểm tra localStorage có khả dụng không
const isLocalStorageAvailable = () => {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveLesson = async (lesson, currentIndex) => {
  try {
    if (!isLocalStorageAvailable()) {
      throw new Error('localStorage không khả dụng');
    }
    localStorage.setItem('currentLesson', JSON.stringify(lesson));
    localStorage.setItem('currentIndex', currentIndex.toString());
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu bài học:', error);
    return false;
  }
};

export const loadLesson = async () => {
  try {
    if (!isLocalStorageAvailable()) {
      throw new Error('localStorage không khả dụng');
    }
    const lessonStr = localStorage.getItem('currentLesson');
    const lesson = lessonStr ? JSON.parse(lessonStr) : null;
    const currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;
    return { lesson, currentIndex };
  } catch (error) {
    console.error('Lỗi khi tải bài học:', error);
    return { lesson: null, currentIndex: 0 };
  }
};

export const clearLesson = async () => {
  try {
    if (!isLocalStorageAvailable()) {
      throw new Error('localStorage không khả dụng');
    }
    localStorage.removeItem('currentLesson');
    localStorage.removeItem('currentIndex');
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa bài học:', error);
    return false;
  }
}; 