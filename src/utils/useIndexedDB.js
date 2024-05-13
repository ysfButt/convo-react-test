import { useEffect, useState } from 'react';

function useIndexedDB(databaseName, storeName) {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open(databaseName);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      setDb(db);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.errorCode);
    };
  }, [databaseName, storeName]);

  const addObject = (object) => {
    if (!db) return; // Check if db is initialized
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    store.add(object);
  };

  const getAllObjects = (callback) => {
    if (!db) return; // Check if db is initialized
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      callback(request.result);
    };

    request.onerror = (event) => {
      console.error('Error getting objects from IndexedDB:', event.target.errorCode);
    };
  };

  return {
    addObject,
    getAllObjects,
  };
}

export default useIndexedDB;